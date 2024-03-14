import React from 'react';
import { Link } from 'react-router-dom';

import iconPath from '../../images/account_icon.svg';

export default function Navigation(props){

    const [menuEnabled, setMenuEnabled] = React.useState(false);
    const [currentHref, setCurrentHref] = React.useState('');
    
    
    React.useEffect(() => {
        getCurrentHref();
    }, ); 
    
    function getCurrentHref(){
        const words = window.location.href.split('/');
        setCurrentHref(words[words.length-1]);
    }

    function handelMenuButtonClick(){
        if(menuEnabled){
            setMenuEnabled(false);
        }
        else{
            setMenuEnabled(true);
        }
    }

    function handelCloseButtonClick(){
        setMenuEnabled(false);
    }

    return(
        <>
            <div className='header__link-container header__link-container_logged'>
                <div className='header__link-subcontainer'>
                    <Link className="header__link" id='movies' to={'/movies'}>
                    Фильмы
                    </Link>
                    <Link className="header__link" id='saved-movies' to={'/saved-movies'}>
                    Сохранённые фильмы
                    </Link>
                </div>
                <Link className="header__link" id='sign-in' to={'/profile'}>
                    <button className="header__account-button">
                    <img className="header__icon" src={iconPath} alt="логотип"/>
                    <p>Аккаунт</p>
                    </button>
                </Link>
            </div>
            <button className='navigation__menu-button' onClick={handelMenuButtonClick}/>
            <div className={`${menuEnabled?'navigation__slider':'navigation__slider navigation__slider_disabled'}`}>
                <div className='navigation__list'>
                    <button className='navigation__close-button' onClick={handelCloseButtonClick}/>
                    <div className='navigation__container'>
                        <div className='navigation__subcontainer'>
                            <Link
                                className={`navigation__link ${currentHref===''?'navigation__link_underlined':''}`}
                                to='/'
                            >
                                Главная
                            </Link>
                            <Link
                                className={`navigation__link ${currentHref==='movies'?'navigation__link_underlined':''}`}
                                to='/movies'
                            >
                                Фильмы
                            </Link>
                            <Link
                                className={`navigation__link ${currentHref==='saved-movies'?'navigation__link_underlined':''}`}
                                to='/saved-movies'
                            >
                                Сохранённые фильмы
                            </Link>
                        </div>
                        <Link className="navigation__link" id='sign-in' to={'/profile'}>
                            <button className="header__account-button">
                            <img className="header__icon" src={iconPath} alt="логотип"/>
                            <p>Аккаунт</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div> 
        </>
  ) 
}
