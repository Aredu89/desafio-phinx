import React from 'react';
import './Card.css';

//Imagenes
import StarBorderWhite from '../../images/icons/star_outline_white.svg'

const Card = props => {
  const { character, selectCharacter } = props
  return(
    <div className="card">
      <div 
        className="image"
        style={{
          backgroundImage: `url("${character.thumbnail.path}.${character.thumbnail.extension}")`
        }}
        >
        <img className="favorito" src={StarBorderWhite} alt="Favorito" />
        <div className="name" onClick={()=>selectCharacter(character.id, character.name, character.comics.collectionURI)}>{character.name}</div>
      </div>   
    </div>
  )
}

export default Card;