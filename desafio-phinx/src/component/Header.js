import React from 'react';
import Logo from '../images/marvel-logo.png'
import './Header.css';

const MarvelIcon = props => {
  return(
    <div className="marvel-icon">
      <img src={Logo} alt="Marvel Logo" />
    </div>
  )
}

const InputBuscador = props => {
  return(
    <div className="input-buscador">
      Input
    </div>
  )
}

const Header = props => {
  return(
    <div className="header d-flex align-items-center row">
      <div className="col-1 icon-container">
        <MarvelIcon />
      </div>
      <div className="col-10 input-container">
        <InputBuscador />
      </div>
    </div>
  )
}

export default Header;