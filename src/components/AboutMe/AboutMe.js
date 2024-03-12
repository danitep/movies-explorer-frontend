import React from 'react';
import BlockTitle from '../BlockTitle/BlockTitle';
import Border from '../Border/Border';
import Portfolio from '../Portfolio/Portfolio';
import studentPhoto from '../../images/student__photo.png'

export default function AboutMe(props){
  return(
    <section className="about-me" id="student">
      <BlockTitle
        text={'Студент'}
      />
      <Border/>
      <div className='about-me__container'>
        <div className='about-me__bio'>
            <h2 className='about-me__name'>Виталий</h2>
            <h3 className='about-me__about'>Фронтенд-разработчик, 30 лет</h3>
            <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a className='about-me__link' href='https://github.com/danitep' target='_blank' rel='noreferrer'>Github</a>
        </div>
        <img className='about-me__photo' src={studentPhoto} alt='Фото студента'/>
      </div>
      <Portfolio/>
    </section>
  ) 
}
