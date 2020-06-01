import React, { useEffect, useState } from 'react';
import './ComicsModal.css';

//Imagenes
import StarBorderGrey from '../images/icons/star_outline_grey.svg'

//Componentes
import Spinner from './common/Spinner.js';
import Error from './common/Error.js';

//Hooks para obtener datos
const useComics = (URI) => {
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
      try{
        const response = await fetch(`${URI}${apiKey}&limit=40&orderBy=onsaleDate`, options)
        const result = await response.json()
        setComics(result.data.results)
        console.log("Comics: ",result.data.results)
      } catch {
        setComicsError(true)
      }
      setComicsLoading(false)
    }

    fetchData()
  },[])

  return [{ comics, comicsLoading, comicsError }]
}

const RowComicsList = props => {
  const { comic } = props
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
          <img className="favorito" src={StarBorderGrey} alt="Favorito" />
        </div>
        <div className="comic-description">{comic.description}</div>
      </div>
    </div>
  )
}

const ComicsList = props => {
  const { comics, comicsLoading, comicsError } = props
  return(
    <div className="comics-list">
      {comicsLoading && <Spinner />}
      {comicsError && <Error message="Error al cargar los comics" />}
      {comics.length > 0 ?(
        comics.map((comic, i)=>{
          return <RowComicsList key={i} comic={comic} />
        })
      ) : (
        !comicsLoading && !comicsError &&
        <div className="w-100 text-center">No hay resultados...</div>
      )}
    </div>
  )
}

const ComicsModal = props => {
  const { selectedCharacter } = props
  const [{ comics, comicsLoading, comicsError }] = useComics(selectedCharacter.URI)

  return(
    <div className="comics-modal">
      <div className="titulo">{selectedCharacter.name}</div>
      <ComicsList
        comics={comics}
        comicsLoading={comicsLoading}
        comicsError={comicsError}
        />
    </div>
  )
}

export default ComicsModal;