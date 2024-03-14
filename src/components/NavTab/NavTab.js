import React from 'react';

export default function NavTab(props){
  return(
    <section className="navtab">
      <a className="navtab__link" href="#about" >О проекте</a>
      <a className="navtab__link" href="#techs" >Технологии</a>
      <a className="navtab__link" href="#student" >Студент</a>
    </section>
  )
}
