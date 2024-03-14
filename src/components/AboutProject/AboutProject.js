import React from 'react';
import BlockTitle from '../BlockTitle/BlockTitle';
import Border from '../Border/Border';

export default function AboutProject(props){
  return(
    <section className="about-project" id='about'>
      <BlockTitle
        text={'О проекте'}
      />
      <Border/>
      <div className="about-project__text-container">
        <div className="about-project__text-block">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__text-block">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>       
      </div>
      <div className="about-project__progress-line">
            <div className="about-project__progress-tile">
                <p className="about-project__progress-text">1 неделя</p>
            </div>
            <div className="about-project__progress-tile">
                <p className="about-project__progress-text">4 недели</p>
            </div>
        </div>
        <div className="about-project__progress-line" id="pseudo">
            <div className="about-project__progress-tile" id="pseudo">
                <p className="about-project__progress-text" id="pseudo">Back-end</p>
            </div>
            <div className="about-project__progress-tile" id="pseudo">
                <p className="about-project__progress-text" id="pseudo">Front-end</p>
            </div>
        </div>
    </section>
  ) 
}
