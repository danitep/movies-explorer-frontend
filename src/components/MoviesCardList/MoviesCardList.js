import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader'
import EmptyBox from '../EmptyBox/EmptyBox';



export default function MoviesCardList(props){



  if(props.isLoading){
    return(
      <Preloader/>
    )
  }
  if(props.cardsForLoading.length!==0)
  return(
    <ul className='card-list'>
      {
        props.cardsForLoading.map((cardInfo)=>{
          return (
            <MoviesCard 
              card={cardInfo}
              buttonType={props.cardButtonType}
              id={window.location.pathname === '/saved-movies'? cardInfo.movieId : cardInfo.id}
              onCardDelete={props.onCardDelete}
              onSave={props.onSave}
              key={window.location.pathname === '/saved-movies'? cardInfo.movieId : cardInfo.id}
            />
          )
        })
      }
    </ul>
  )
  else{
    return(
      <EmptyBox
        text={'Ничего не найдено'}
      />
    )
  }
}
