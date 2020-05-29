import React from 'react';
import './Card.css';

//Imagenes
import StarBorderWhite from '../../images/icons/star_outline_white.svg'

const Card = props => {
  const { character } = props
  return(
    <div className="card">
      <div 
        className="image"
        style={{
          backgroundImage: `url("${character.thumbnail.path}.${character.thumbnail.extension}")`
        }}
        >
        <img className="favorito" src={StarBorderWhite} alt="Favorito" />
        <div className="name">{character.name}</div>
      </div>   
    </div>
  )
}

export default Card;