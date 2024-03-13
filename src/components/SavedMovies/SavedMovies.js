import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import EmptyBox from '../EmptyBox/EmptyBox';


export default function SavedMovies(props){

  const [isLoading, setIsLoading] = React.useState(false);

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
      <section className='movies'>
        <SearchForm
          onSearchSubmit={handleSubmit}
          keywordAddress={'savedMoviesKeyword'}
          isShortAddress={'isShortSavedMovie'}
          onSwitchClick={props.onSwitchClick}
        />
        <MoviesCardList
          cardsForLoading={props.cards}
          cardButtonType={'delete'}
          onCardDelete={props.onCardDelete}
          isLoading={isLoading}
        />
        <EmptyBox/>
      </section>
      <Footer/>
    </>
  )

  
}