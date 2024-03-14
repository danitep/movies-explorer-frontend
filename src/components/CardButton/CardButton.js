import React from 'react';

export default function CardButton(props){

  if (props.id === 'toggle'){
    return(
      <div 
        className='card__button'
        id={props.id}
        onClick={props.onClick}
      >
        <div className={`card__subbutton ${props.selected ? 'card__subbutton_selected' : ''}`}>
        </div>
      </div>
    ) 
  }
  else{
    return(
      <div 
      className='card__button' 
      id={props.id}
      onClick={props.onClick}>
      </div>
    ) 
  }
}
