import React from 'react';

export default function FormSwitch(props){
  function handleSwitchClick(){
    props.onClick();
  }

  return(
    <div className='switch' id={props.id}>
        <div 
        className={`switch__container ${props.switchOn ? 'switch__container_active':''}`}
        onClick={handleSwitchClick}>
          <div className='switch__dot'/>
        </div>
        <p className='switch__short-film'>Короткометражки</p>
      </div>
  ) 
}
