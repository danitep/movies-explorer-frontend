import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import { cardListParamList } from '../../utils/constants';
import EmptyBox from '../EmptyBox/EmptyBox';

export default function Movies(props){

  //параметры списка карточек
  const desktopParams = cardListParamList.desktop;
  const tabletParams = cardListParamList.tablet;
  const mobileParams = cardListParamList.mobile;

  //Ширина окна
  let screenWidth = useScreenWidth();

  const [cardsForLoading, setCardsForLoading] = React.useState([]);
  const [params, setParams] = React.useState(desktopParams);
  const [isEndOfList, setEndOfList] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  

  //Для обрезания количества карточек
  React.useEffect(() => {
    if(cardsForLoading.length === props.cards.length){
      setEndOfList(true);
    }
    else{
      setEndOfList(false);
    }
  }, [cardsForLoading, props.cards, props.cards.length]); 


  
  //Фунция для контроля ширины
  function useScreenWidth() {
    const getCurrentScreenWidth = React.useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = React.useState(getCurrentScreenWidth());
  
    React.useEffect(() => {
      function handleScreenResize() {
        setScreenWidth(getCurrentScreenWidth());
      }
      let timer;
      function resizeController() {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            handleScreenResize();
          }, 500);
        }
      }
      window.addEventListener("resize", resizeController);
      window.removeEventListener("resize", handleScreenResize);
    }, [getCurrentScreenWidth]);
    return screenWidth;
  }

  //Для обрезания количества карточек
  React.useEffect(() => {
    const filteredCards = props.cards.filter((card, i) => i < params.initialLength)
    setCardsForLoading(filteredCards);
  }, [props.cards, params]); 


  //Для установки параметров списка карточек
  React.useEffect(() => {
    if(window.innerWidth >= desktopParams.width){
      setParams(desktopParams);
    } 
    else if(window.innerWidth < desktopParams.width && window.innerWidth >= tabletParams.width){
      setParams(tabletParams);
    }
    else if(window.innerWidth < tabletParams.width){
      setParams(mobileParams);
    }
  }, [screenWidth, desktopParams, tabletParams, mobileParams]); 

  //Для добавления новых карточек
  function handleClickMoreMovies() {
    const start = cardsForLoading.length;
    const end = start + params.extraLength;
    const additional = props.cards.length - start;

    if (additional > 0) {
      const newCards = props.cards.slice(start, end);
      setCardsForLoading([...cardsForLoading, ...newCards]);
    }
    else{
      setEndOfList(true);
    }
  }

  function handleSubmit(keyword, shortFilmsEnabled){
    setIsLoading(true);
    props.onSearchSubmit(keyword, shortFilmsEnabled)
    .finally(()=>{
      setIsLoading(false);
    })
  }



  return(
    <>
      <Header
        isloggedIn={props.isloggedIn}
        onLogoClick={props.onLogoClick}
        id={'movies'}
      />
      <main className='movies'>
        <SearchForm
          onSearchSubmit={handleSubmit}
          keywordAddress={'keyword'}
          isShortAddress={'isShortMovie'}
          onSwitchClick={props.onSwitchClick}
        />
        <MoviesCardList
          cardButtonType={'toggle'}
          onSave={props.onSave}
          onCardDelete={props.onCardDelete}
          onload={props.onload}
          cardsForLoading={cardsForLoading}
          isLoading={isLoading}
        />
        {!isEndOfList?
        <button 
        className='movies__add-button'
        onClick={handleClickMoreMovies}
        >
        <p className='movies__text'>Ещё</p>
        </button>
        :
        <EmptyBox/>}
      </main>
      <Footer/>
    </>
  )

  
}