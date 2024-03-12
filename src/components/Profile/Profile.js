import React from 'react';
import Header from '../Header/Header';
import ProfileField from '../ProfileField/ProfileField';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile(props){

  const currentUser = React.useContext(CurrentUserContext);

  function handleEditProfile(){
    props.onRedact();
  }

  return(
    <>
      <Header
        isloggedIn={props.isloggedIn}
        onLogoClick={props.onLogoClick}
        id={'Profile'}
      />
      <main className='profile'>
          <div className='profile__container'>
            <h2 className='profile__greeting'>Привет, {currentUser.name}!</h2>
            <div className='profile__fields'>
              <ProfileField
                fieldName='Имя'
                fieldValue={currentUser.name}
              />
              <ProfileField
                fieldName='E-mail'
                fieldValue={currentUser.email}
              />
            </div>
            <div className='profile__buttons'>
              <p className='profile__redact' onClick={handleEditProfile}>Редактировать</p>
              <Link className="profile__exit" id='profile-exit' to={'/'} onClick={props.onExit}>
                Выйти из аккаунта
              </Link>
            </div>
          </div>
      </main>
    </>
  )  
}