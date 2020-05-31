import React, { useEffect, useState } from 'react';
import './ComicsModal.css';

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
        const response = await fetch(`${URI}${apiKey}&limit=40`, options)
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

const ComicsList = props => {
  const { comics, comicsLoading, comicsError } = props
  return(
    <div className="comics-list">
      List
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