import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props){
  return(
    <section className="not-found-page">
      <h1 className="not-found-page__number">404</h1>
      <p className='not-found-page__text'>Страница не найдена</p>
      <Link className='not-found-page__link' id='back' to={'/'}>Назад</Link>
    </section>
  ) 
}
