import React, { useState, useEffect } from 'react';
import './Card.css';

//Imagenes
import StarBorderWhite from '../../images/icons/star_outline_white.svg'
import StarWhite from '../../images/icons/star_white.svg'

const Card = props => {
  const { character, selectCharacter, setPersonajeFavorito } = props
  const [favorito, setFavorito] = useState(false)
  
  useEffect(()=>{
    const favoritos = JSON.parse(localStorage.getItem('personajesFavoritos'))
    const favorito = favoritos ? favoritos.find(favorito => favorito === character.id) : ''
    if(favorito){
      setFavorito(true)
    }
    return () => setFavorito(false)
  },[
    localStorage,
    character.id,
    favorito
  ])

  return(
    <div className="card">
      <div 
        className="image"
        style={{
          backgroundImage: `url("${character.thumbnail.path}.${character.thumbnail.extension}")`
        }}
        >
        <img className="favorito"
          src={favorito ? StarWhite : StarBorderWhite}
          alt="Favorito"
          onClick={()=>{
            setPersonajeFavorito(character.id, !favorito)
            setFavorito(!favorito)
          }}
          />
        <div className="name" onClick={()=>selectCharacter(character.id, character.name, character.comics.collectionURI)}>{character.name}</div>
      </div>   
    </div>
  )
}

export default Card;