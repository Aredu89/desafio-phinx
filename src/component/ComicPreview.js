import React, { useEffect, useState } from 'react';
import './ComicPreview.css';

//Componentes
import Spinner from './common/Spinner.js'
import Error from './common/Error.js'

//Hooks para obtener datos
const useDataComic = (id) => {
  const [data, setData] = useState({})
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
      try{
        const response = await fetch(`http://gateway.marvel.com/v1/public/comics/${id}${apiKey}`, options)
        const result = await response.json()
        console.log("Result comic: ",result.data.results[0])
        setData(result.data.results[0])
      } catch {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  },[
    id
  ])

  return [{ data, isLoading, isError }]
}

const ComicPreview = props => {
  const { idComicPreview, error } = props
  const [{ data, isLoading, isError }] = useDataComic(idComicPreview)

  const getOnSaleDate = dates => {
    const fecha = dates.find(date => date.type === "onsaleDate")
    const objectDate = new Date(fecha.date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[objectDate.getMonth()]} ${objectDate.getDate()}, ${objectDate.getFullYear()}`
  }

  const getWriter = creatorsItems => {
    const writer = creatorsItems.find(item => item.role === "writer")
    if(writer){
      return writer.name
    } else {
      return 'Not available'
    }
  }

  const getPenciler = creatorsItems => {
    const penciler = creatorsItems.find(item => item.role.substring(0,8) === "penciler")
    if(penciler){
      return penciler.name
    } else {
      return 'Not available'
    }
  }

  const getCoverArtist = creatorsItems => {
    const cover = creatorsItems.find(item => item.role === "penciler (cover)")
    if(cover){
      return cover.name
    } else {
      return 'Not available'
    }
  }

  return(
    <div className="comic-preview">
      {
        error ? (
          <div className="text-center">La URL ingresada es incorrecta</div>
        ) : (
          <>
            {isLoading && <Spinner />}
            {isError && <Error message="Error al cargar la vista previa" />}
            {
              data.id ? (
                <div className="row">
                  <div className="image-container col-12 col-sm-5">
                    <img 
                      className="image-preview"
                      src={data.images.length > 0 ? `${data.images[0].path}.${data.images[0].extension}` : ''}
                      alt="Vista previa"
                      />
                  </div>
                  <div className="description-container col-12 col-sm-7">
                    <div className="titulo">{data.title}</div>
                    <div className="info">{`Published: ${getOnSaleDate(data.dates)}`}</div>
                    <div className="info">{`Writer: ${getWriter(data.creators.items)}`}</div>
                    <div className="info">{`Penciler: ${getPenciler(data.creators.items)}`}</div>
                    <div className="info">{`Cover Artist: ${getCoverArtist(data.creators.items)}`}</div>
                    <div className="descripcion">{data.description ? data.description : 'Sin descripción...'}</div>
                  </div>
                </div>
              ) : (
                !isLoading && !isError &&
                <div className="text-center">No hay información para la vista previa</div>
              )
            }
          </>
          
        )
      }
    </div>
  )
}

export default ComicPreview;