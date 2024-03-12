import React from 'react';
import Border from '../Border/Border';
import BlockTitle from '../BlockTitle/BlockTitle';

export default function Techs(props){
  return(
    <section className="techs" id='techs'>
      <BlockTitle
        text={'Технологии'}
      />
      <Border/>
      <h2 className='techs__title'>7 технологий</h2>
      <h3 className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h3>
      <ul className='techs__grid'>
        <li className='techs__element'>
            <p className='techs__text'>HTML</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>CSS</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>JS</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>React</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>Git</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>Express.js</p>
        </li>
        <li className='techs__element'>
            <p className='techs__text'>mongoDB</p>
        </li>
      </ul>
    </section>
  ) 
}
