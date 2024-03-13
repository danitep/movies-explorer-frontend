import React from 'react';
import searchIcon from '../../images/search__icon.svg'
import FormSwitch from '../FormSwitch/FormSwitch';
import Border from '../Border/Border';

export default function SearchForm(props){

  const searchRef = React.useRef();

  React.useEffect(() => {
    searchRef.current.value=JSON.parse(localStorage.getItem(props.keywordAddress));
    setshortFilmsEnabled(JSON.parse(localStorage.getItem(props.isShortAddress)));
  }, []); 


  //Для нажатия на переключатель короткометражек
  const [shortFilmsEnabled, setshortFilmsEnabled] = React.useState(false);

  //Функция для нажатия на переключатель короткометражек
  function handleShortFilmsClick(){
    if(shortFilmsEnabled){
      setshortFilmsEnabled(false);
      props.onSwitchClick(searchRef.current.value, false);
  }
    else{
      //Доп.фильтр карточек
      setshortFilmsEnabled(true);
      props.onSwitchClick(searchRef.current.value, true);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    props.onSearchSubmit(searchRef.current.value, shortFilmsEnabled);
  }

  return(
    <section className='search-form'>
      <form 
      className="search-form__container" 
      noValidate 
      onSubmit={handleSubmit}>
        <img className='search-form__icon' src={searchIcon} alt='иконка поиска'/>
        <input className='search-form__input'
          type="text" 
          id="film__search"
          placeholder='Фильм'
          name="user__name"
          ref={searchRef}
          required
          maxLength="40"/>
        <button className='search-form__button'></button>
        <div className='search-form__border'></div>
        <FormSwitch
          id='innerSwitch'
          switchOn={shortFilmsEnabled}
          onClick={handleShortFilmsClick}
        />
      </form>
      <FormSwitch
        id='outerSwitch'
        switchOn={shortFilmsEnabled}
        onClick={handleShortFilmsClick}
      />
      <Border id='gray'/>
    </section>
  ) 
}