import React, { useEffect, useState } from 'react';
import './ComicsModal.css';

//Imagenes
import StarBorderGrey from '../images/icons/star_outline_grey.svg'
import StarGrey from '../images/icons/star_grey.svg'

//Componentes
import Spinner from './common/Spinner.js';
import Error from './common/Error.js';

//Hooks para obtener datos
const useComics = (URI, history) => {
  const [comics, setComics] = useState([])
  const [comicsLoading, setComicsLoading] = useState(false)
  const [comicsError, setComicsError] = useState(false)

  useEffect(() =>{
    const fetchData = async () => {
      setComicsError(false)
      setComicsLoading(true)
      const options = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const apiKey = "?ts=1&apikey=559d5acc5e36c6f7495c9ef2fbf86fda"
      let query = ''
      const search = new URLSearchParams(history.location.search)
      const filtroComic = search.get('comic')
      if(filtroComic){
        //Reemplazo los espacios con %
        const array = filtroComic.split(' ')
        const replacedComic = ''
        array.forEach(word=>{
          replacedComic = replacedComic + word + "%"
        })
        query = query + `&titleStartsWith=%${filtroComic.toString()}`
      }
      try{
        const response = await fetch(`https${URI.substring(4)}${apiKey}${query}&orderBy=onsaleDate`, options)
        const result = await response.json()
        setComics(result.data.results)
      } catch {
        setComicsError(true)
      }
      setComicsLoading(false)
    }
    fetchData()
  },[
    URI,
    history
  ])

  return { comics, comicsLoading, comicsError }
}

const RowComicsList = props => {
  const { comic, setComicFavorito } = props
  const [favorito, setFavorito] = useState(false)

  //Defino si es favorito o no segun local storage
  useEffect(()=>{
    const favoritos = JSON.parse(localStorage.getItem('comicsFavoritos'))
    const favorito = favoritos ? favoritos.find(favorito => favorito === comic.id) : ''
    if(favorito){
      setFavorito(true)
    }
    return () => setFavorito(false)
  },[
    comic.id,
    favorito
  ])

  let URLImage = ''
  if(comic.images){
    if(comic.images.length > 0){
      URLImage = `${comic.images[0].path}.${comic.images[0].extension}`
    }
  }
  return(
    <div className="row-comics-list mb-4 d-flex align-items-center">
      <div 
        className="image"
        style={{
          backgroundImage: `url("${URLImage}")`
        }}
        />
      <div className="container-description">
        <div className="d-flex align-items-center">
          <span className="mr-2 titulo-comic"
            >{comic.title}</span>
          <img className="favorito" 
            src={favorito ? StarGrey : StarBorderGrey}
            alt="Favorito"
            onClick={()=>{
              setComicFavorito(comic.id, !favorito)
              setFavorito(!favorito)
            }}
            />
        </div>
        <div className="comic-description">{comic.description}</div>
      </div>
    </div>
  )
}

const ComicsList = props => {
  const { comics, comicsLoading, comicsError, setComicFavorito } = props
  return(
    <div className="comics-list">
      {comicsLoading && <Spinner />}
      {comicsError && <Error message="Error al cargar los comics" />}
      {comics.length > 0 ?(
        comics.map((comic, i)=>{
          return <RowComicsList key={i} comic={comic} setComicFavorito={setComicFavorito} />
        })
      ) : (
        !comicsLoading && !comicsError &&
        <div className="w-100 text-center">No hay resultados...</div>
      )}
    </div>
  )
}

const ComicsModal = props => {
  const { selectedCharacter, history, setComicFavorito } = props
  const { comics, comicsLoading, comicsError } = useComics(selectedCharacter.URI, history)

  return(
    <div className="comics-modal">
      <div className="titulo">{selectedCharacter.name}</div>
      <ComicsList
        comics={comics}
        comicsLoading={comicsLoading}
        comicsError={comicsError && selectedCharacter.URI ? true : false}
        setComicFavorito={setComicFavorito}
        />
    </div>
  )
}

export default ComicsModal;