import React from 'react';
import logoPath from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

export default function Header(props){

  if (props.isloggedIn){
    return(
      <header className="header" id={props.id}>
        <img className="header__logo" src={logoPath} alt="логотип" onClick={props.onLogoClick}/>
         <Navigation/>
      </header>
    )
  }
  else{
    return(
      <header className="header" id={props.id}>
        <img className="header__logo" src={logoPath} alt="логотип" onClick={props.onLogoClick}/>
        <div className='header__link-container'>
          <Link className="header__link" id='sign-up' to={props.isloggedIn? '/': '/sign-up'}>
            Регистрация
          </Link>
          <Link className="header__link" id='sign-in' to={props.isloggedIn? '/': '/sign-in'}>
            <button className="header__landing-button" type='button'>Войти</button>
          </Link>
        </div>  
      </header>
    )
  }
  
}