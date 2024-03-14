import React from 'react';
import SignUpIn from '../SignUpIn/SignUpIn';
import { useFormWithValidation } from '../FormValidator/FormValidator';

export default function Login(props){
  const emailRef = React.useRef();
  const passwordRef = React.useRef();


  const Validation = useFormWithValidation();


  React.useEffect(() => {
    ToggleButtonState();
  }, [Validation.isValid]); 

  function handleInputChange(e){
    Validation.handleChange(e);
  }

  function ToggleButtonState(){
    const SubmitButton = document.querySelector('.login__button');
    if (!Validation.isValid){
      SubmitButton.setAttribute("disabled", true);
    }
    else{
      SubmitButton.removeAttribute("disabled", true);
    }
  }




  function handleSubmit(e){
    e.preventDefault();
    const SubmitButton = document.querySelector('.login__button');
    SubmitButton.setAttribute("disabled", true);
    props.onSubmit(emailRef.current.value, passwordRef.current.value)
    SubmitButton.setAttribute("disabled", true);
  } 

  React.useEffect(() => {
      emailRef.current.value='';
      passwordRef.current.value='';
  }, []); 

  return(
    <SignUpIn
      greeting="Рады видеть!"
      question="Ещё не зарегистрированы?"
      linkText="Регистрация"
      id="sign-up"
      to="/sign-up"
      onLogoClick={props.onLogoClick}
    >
      <form className="login__form" id={props.name} name={props.name} onSubmit={handleSubmit}>
        <div className="login__field-container">
          <p className='login__field-name'>E-mail</p>
          <input type="email" 
          onChange={handleInputChange}
          ref={emailRef}
          className="login__input" 
          id="e_mail__field" 
          name="e_mail" 
          placeholder="example@mail.ru" 
          required 
          minLength="2" 
          maxLength="40"/>
          <span className={`login__error ${Validation.errors.e_mail !== '' ? 'login__error_enabled' : ''}`}
          id="profile__description__field-error">
            {Validation.errors.e_mail}
          </span>
        </div>
        <div className="login__field-container">
          <p className='login__field-name'>Пароль</p>
          <input type="password" 
          onChange={handleInputChange}
          ref={passwordRef}
          className="login__input" 
          id="password__field" 
          name="password" 
          placeholder="" 
          required 
          minLength="8"/>
          <span className={`login__error ${Validation.errors.password !== '' ? 'login__error_enabled' : ''}`}
          id="profile__description__field-error">
            {Validation.errors.password}
          </span>
        </div>
        <button 
        className="login__button" 
        type="submit"
        >Войти</button>
      </form>

    </SignUpIn>
  ) 
}
