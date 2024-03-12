import React from 'react';
import logoPath from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

export default function SignUpIn(props){
  return(
    <main className="sign-up-in">
      <img 
        className="sign-up-in__logo" 
        src={logoPath} 
        alt="логотип"
        onClick={props.onLogoClick}
      />
      <h2 className="sign-up-in__greeting">{props.greeting}</h2>
      {props.children}
      <div className='sign-up-in__bottom'>
        <p className='sign-up-in__question'>{props.question}</p>
        <Link 
        className='sign-up-in__link' 
        id={props.id} 
        to={props.to}>
        {props.linkText}
        </Link>
      </div>
    </main>
  ) 
}
