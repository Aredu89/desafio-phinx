import React, { useState, useEffect } from 'react';
import './App.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

//Componentes
import Header from './Header.js'
import Lista from './Lista.js'
import ComicsModal from './ComicsModal.js'

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
        //Reemplazo los espacios con %
        const arraySplit = filtroName.split(' ')
        let nuevoFiltro = ''
        arraySplit.forEach(word=>{
          nuevoFiltro = nuevoFiltro + word + "%"
        })
        query = query + `&nameStartsWith=%${nuevoFiltro}`
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
  const [selectedCharacter, setSelectedCharacter] = useState({})

  //Asigno un character en queryString aleatoreamente
  useEffect(()=>{
    const search = new URLSearchParams(props.history.location.search)
    const filtroName = search.get('character')
    if(data.length > 0){
      if(!filtroName){
        const index = Math.floor(Math.random() * data.length)
        props.history.push(props.history.location.pathname + `?character=${data[index].name}`)
      }
    }
  },[
    data,
    props.history
  ])

  const handleOnFilterEnter = event => {
    if(event.key === 'Enter'){
      props.history.push(props.history.location.pathname + `?character=${event.target.value}`)
    }
  }

  const handleOnFilterChange = event => {
    setNameFilter(event.target.value)
  }

  //Click en el personaje de una card
  const selectCharacter = (id, name, URI) => {
    setSelectedCharacter({
      id,
      name,
      URI
    })
  }

  const onCloseModal = () => {
    setSelectedCharacter({})
  }

  const handleOnSelectComic = (title) => {
    props.history.push(props.history.location.pathname + 
      props.history.location.search +
      `&comic=${title}`
      )
    onCloseModal()
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
        selectCharacter={selectCharacter}
        />
      {/* Modal de comics */}
      <Modal
        classNames={{modal: ['modal-custom'], closeButton: ['modal-custom-button']}}
        onClose={()=>onCloseModal()}
        showCloseIcon={true}
        open={selectedCharacter.id ? true : false}
        center
        >
          <ComicsModal
            selectedCharacter={selectedCharacter}
            onSelectComic={handleOnSelectComic}
            />
      </Modal>
    </div>
  );
}

export default App;