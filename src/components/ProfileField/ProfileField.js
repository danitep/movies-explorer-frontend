import React from 'react';


export default function ProfileField(props){
  return(
    <div className="profile-field">
      <p className="profile-field__name">{props.fieldName}</p>
      <p className='profile-field__value'>{props.fieldValue}</p>
    </div>
  ) 
}
