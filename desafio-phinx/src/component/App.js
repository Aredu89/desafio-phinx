import React, { useState, useEffect } from 'react';
import './App.css';

//Componentes
import Header from './Header.js'
import Lista from './Lista.js'

//Hooks para obtener datos
const useDataMarvel = (history) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

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
      const search = new URLSearchParams(history.location.search)
      const filtroName = search.get('character')
      if(filtroName){
        query = query + `&nameStartsWith=%${filtroName}`
      }
      try{
        const response = await fetch(`http://gateway.marvel.com/v1/public/characters${apiKey}${query}&limit=40&orderBy=modified`, options)
        const result = await response.json()
        setData(result.data.results)
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  },[
    history.location.search
  ])

  return [{ data, isLoading, isError }]
}

const App = props => {
  const [nameFilter, setNameFilter] = useState('')
  const [{ data, isLoading, isError }] = useDataMarvel(props.history)

  //Asigno un character en queryString aleatoreamente
  useEffect(()=>{
    const search = new URLSearchParams(props.history.location.search)
    const filtroName = search.get('character')
    if(data.length > 0){
      if(!filtroName){
        const index = Math.floor(Math.random() * data.length)
        const name = data[index].name.split(' ')
        props.history.push(props.history.location.pathname + `?character=${name[0]}`)
      }
    }
  },[
    data
  ])

  const handleOnFilterEnter = event => {
    if(event.key === 'Enter'){
      props.history.push(props.history.location.pathname + `?character=${event.target.value}`)
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