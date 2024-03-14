import React from 'react';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

export default function Main(props){
  return(
    <>
      <Header
        isloggedIn={props.isloggedIn}
        onExitClick={props.onExitClick}
        onLogoClick={props.onLogoClick}
        id={'main'}
      />
      <main className='about'>
          
          <Promo/>
          <NavTab/>
          <AboutProject/>
          <Techs/>
          <AboutMe/>
      </main>
    </>
  )

  
}