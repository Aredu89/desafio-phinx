import React, { useState, useEffect } from 'react';
import './App.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

//Componentes
import Header from './Header.js'
import Lista from './Lista.js'
import ComicsModal from './ComicsModal.js'
import ComicPreview from './ComicPreview.js'

//Hooks para obtener datos
const useDataMarvel = (history, filtrarFavoritos) => {
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
        let nuevoFiltroName = ''
        arraySplit.forEach(word=>{
          nuevoFiltroName = nuevoFiltroName + word + "%"
        })
        query = query + `&nameStartsWith=%${nuevoFiltroName}`
      }
      try{
        const response = await fetch(`http://gateway.marvel.com/v1/public/characters${apiKey}${query}&limit=40&orderBy=modified`, options)
        const result = await response.json()
        if(filtrarFavoritos){
          const favoritos = JSON.parse(localStorage.getItem('personajesFavoritos'))
          if(favoritos){
            let dataAux = []
            result.data.results.forEach(item=>{
              const dato = favoritos.find(fav => fav === item.id)
              if(dato){
                dataAux.push(item)
              }
            })
            setData(dataAux)
          } else {
            setData(result.data.results)
          }
        } else {
          setData(result.data.results)
        }
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  },[
    history.location.search,
    filtrarFavoritos
  ])

  return { data, isLoading, isError }
}

const App = props => {
  const [nameFilter, setNameFilter] = useState('')
  const [filtrarFavoritos, setFiltrarFavoritos] = useState(false)
  const { data, isLoading, isError } = useDataMarvel(props.history, filtrarFavoritos)
  const [selectedCharacter, setSelectedCharacter] = useState({})
  const [comicPreview, setComicPreview] = useState(false)
  const [idComicPreview, setIdComicPreview] = useState()
  const [errorComicPreview, setErrorComicPreview] = useState(false)

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
      const value = event.target.value
      if(value.substring(0,4) === 'http'){
        setComicPreview(true)
        let urlCorrecta = true
        //Busco el comic con el ID en la URL
        const splitURL = value.split('/')
        //Controlo que la URL sea correcta
        splitURL.forEach((part, i)=>{
          if(i === 2){
            if(part !== "www.marvel.com"){
              urlCorrecta = false
            }
          }
          if(i === 3){
            if(part !== "comics"){
              urlCorrecta = false
            }
          }
          if(i === 4){
            if(part !== "issue"){
              urlCorrecta = false
            }
          }
          if(i === 5){
            if(isNaN(Number(part))){
              urlCorrecta = false
            }
          }
        })
        if(urlCorrecta){
          setErrorComicPreview(false)
          setIdComicPreview(splitURL[5])
        } else {
          setIdComicPreview('')
          setErrorComicPreview(true)
        }
      } else {
        setComicPreview(false)
        props.history.push(props.history.location.pathname + `?character=${value}`)
      }
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

  const setPersonajeFavorito = (id, favorito) => {
    let array = []
    const persFav = localStorage.getItem('personajesFavoritos')
    if(persFav){
      array = JSON.parse(persFav)
    }
    if(favorito){
      array.push(id)
    } else {
      let arrayAux = []
      array.forEach((fav, i)=>{
        if(fav !== id){
          arrayAux.push(fav)
        }
      })
      array = arrayAux
    }
    localStorage.setItem('personajesFavoritos', JSON.stringify(array))
  }

  const setComicFavorito = (id, favorito) => {
    let array = []
    const comicsFav = localStorage.getItem('comicsFavoritos')
    if(comicsFav){
      array = JSON.parse(comicsFav)
    }
    if(favorito){
      array.push(id)
    } else {
      let arrayAux = []
      array.forEach((fav, i)=>{
        if(fav !== id){
          arrayAux.push(fav)
        }
      })
      array = arrayAux
    }
    localStorage.setItem('comicsFavoritos', JSON.stringify(array))
  }

  return (
    <div className="App">
      <Header
        onFilterEnter={handleOnFilterEnter}
        onFilterChange={handleOnFilterChange}
        filterValue={nameFilter}
        filtrarFavoritos={filtrarFavoritos}
        setFiltrarFavoritos={setFiltrarFavoritos}
        />
      {
        comicPreview ? (
          <ComicPreview
            idComicPreview={idComicPreview}
            error={errorComicPreview}
            />
        ) : (
        <Lista
          data={data}
          isLoading={isLoading}
          isError={isError}
          selectCharacter={selectCharacter}
          setPersonajeFavorito={setPersonajeFavorito}
          />
        )
      }
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
            history={props.history}
            setComicFavorito={setComicFavorito}
            />
      </Modal>
    </div>
  );
}

export default App;