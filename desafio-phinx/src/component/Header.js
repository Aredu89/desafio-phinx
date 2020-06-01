import React, { useState } from 'react';
import './Header.css';

//Imágenes
import Logo from '../images/marvel-logo.png'
import Search from '../images/icons/search_grey.svg'
import StarBorder from '../images/icons/star_outline_grey.svg'
import StarGrey from '../images/icons/star_grey.svg'

const MarvelIcon = props => {
  return(
    <div className="marvel-icon">
      <img src={Logo} alt="Marvel Logo" />
    </div>
  )
}

const InputBuscador = props => {
  const { onFilterEnter, onFilterChange, filterValue, filtrarFavoritos, setFiltrarFavoritos } = props

  return(
    <div className="input-buscador d-flex justify-content-between">
      <div className="w-100">
        <img className="mr-2" src={Search} alt="" />
        <input
          className='input'
          name="busqueda"
          value={filterValue}
          onChange={onFilterChange}
          onKeyDown={onFilterEnter}
          placeholder="Buscar"
        />
      </div>
      <img className="favoritos"
        src={filtrarFavoritos ? StarGrey : StarBorder}
        alt="Favoritos"
        onClick={()=>setFiltrarFavoritos(!filtrarFavoritos)}
        />
    </div>
  )
}

const Header = props => {
  const { onFilterEnter, onFilterChange, filterValue, filtrarFavoritos, setFiltrarFavoritos } = props
  return(
    <div>
      <div className="header d-flex align-items-center row">
        <div className="col-2 col-md-1 icon-container">
          <MarvelIcon />
        </div>
        <div className="col-10 input-container">
          <InputBuscador 
            onFilterEnter={onFilterEnter}
            onFilterChange={onFilterChange}
            filterValue={filterValue}
            filtrarFavoritos={filtrarFavoritos}
            setFiltrarFavoritos={setFiltrarFavoritos}
            />
        </div>
      </div>
    </div>
    
  )
}

export default Header;