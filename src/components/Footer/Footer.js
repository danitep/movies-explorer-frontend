import React from 'react';

export default function Footer(props){
  return(
    <footer className="footer">
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__date'>©2024</p>
        <div className='footer__links'>
            <a className='footer__text' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
            <a className='footer__text' href='https://github.com' target='_blank' rel='noreferrer'>Github</a>
        </div>
      </div>
    </footer>
  ) 
}
