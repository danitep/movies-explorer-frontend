import React from 'react';

export default function EmptyBox(props){
  return(
    <div className='empty-box'>
       <p className='empty-box__text'>{props.text}</p> 
    </div>
  ) 
}
