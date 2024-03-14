import React from 'react';
import CardButton from '../CardButton/CardButton';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard(props){

    const currentUser = React.useContext(CurrentUserContext);
    
    const [buttonSelected, setButtonSelected] = React.useState(false);
    

    React.useEffect(() => {
        const buttonStateFromStorage = localStorage.getItem(`${currentUser.email}-button-${props.id}-selected`);
        if(buttonStateFromStorage === null){
            setButtonSelected(false)
        }
        else{
            setButtonSelected(localStorage.getItem(`${currentUser.email}-button-${props.id}-selected`))
            localStorage.setItem(`${currentUser.email}-button-${props.id}-selected`,false)
        }
    }, [props.card]); 

    const hours = Math.floor(props.card.duration/60);
    const minutes = props.card.duration % 60;

    function handelButtonClick(){
        
        if(props.buttonType === 'toggle'){
            if(buttonSelected){
                props.onCardDelete(props.card)
                .then((isDeletionDone)=>{
                    setButtonSelected(false);
                    localStorage.removeItem(`${currentUser.email}-button-${props.id}-selected`)
                })
            }
            else{
                props.onSave(props.card)
                .then((isSavingDone)=>{
                    setButtonSelected(isSavingDone);
                    localStorage.setItem(`${currentUser.email}-button-${props.id}-selected`,true)
                })
            }
        }
        if(props.buttonType === 'delete'){
            props.onCardDelete(props.card)
            .then((isDeletionDone)=>{
                localStorage.removeItem(`${currentUser.email}-button-${props.id}-selected`)
            })
        }
    }
    
  return(
    <li className='card' key={props.id}>
        <a className='card__link' href={props.card.trailerLink} target='_blank' rel='noreferrer'>
            <img 
            className='card__image' 
            src={`${window.location.pathname === '/saved-movies'? props.card.image : 'https://api.nomoreparties.co'+props.card.image.url}`} 
            alt='избражение карточки'/> 
        </a>
        <div className='card__container'>
            <div className='card__subcontainer'>
                <p className='card__name'>{props.card.nameRU}</p>
                <CardButton
                    selected={buttonSelected}
                    id={props.buttonType}
                    onClick={handelButtonClick}
                />
            </div>
            <p className='card__duration'>{`${hours}ч${minutes}м`}</p>
        </div>
    </li>
  ) 
}
