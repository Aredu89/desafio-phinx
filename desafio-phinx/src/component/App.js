import React, { useState, useEffect } from 'react';
import './App.css';

//Componentes
import Header from './Header.js'
import Lista from './Lista.js'

//Hooks para obtener datos
const useDataMarvel = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [nameQuery, setNameQuery] =useState('')

  useEffect(() =>{
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      const options = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const apiKey = "?ts=1&apikey=559d5acc5e36c6f7495c9ef2fbf86fda"
      let query = ''
      if(nameQuery){
        query = query + `&nameStartsWith=${nameQuery}`
      }
      try{
        const response = await fetch(`http://gateway.marvel.com/v1/public/characters${apiKey}${query}`, options)
        const result = await response.json()
        //We handle error response
        if(result.status === "Ok"){
          setData(result.data.results)
        } else {
          setIsError(true)
        }
      } catch {
        setIsError(true)
      }
        
      setIsLoading(false)
    }
    fetchData()
  },[
    nameQuery
  ])

  return [{ data, isLoading, isError }, setNameQuery]
}

const App = props => {
  const [{ data, isLoading, isError }, setNameQuery] = useDataMarvel()
  const [nameFilter, setNameFilter] = useState('')

  const handleOnFilterEnter = event => {
    if(event.key === 'Enter'){
      setNameQuery(event.target.value)
    }
  }

  const handleOnFilterChange = event => {
    setNameFilter(event.target.value)
  }

  return (
    <div className="App">
      <Header
        onFilterEnter={handleOnFilterEnter}
        onFilterChange={handleOnFilterChange}
        filterValue={nameFilter}
        />
      <Lista
        data={data}
        isLoading={isLoading}
        isError={isError}
        />
    </div>
  );
}

export default App;