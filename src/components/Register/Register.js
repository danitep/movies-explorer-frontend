import React from 'react';
import SignUpIn from '../SignUpIn/SignUpIn';
import { useFormWithValidation } from '../FormValidator/FormValidator';

export default function Register(props){
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const Validation = useFormWithValidation();


  React.useEffect(() => {
    ToggleButtonState();
  }, [Validation.isValid]); 

  React.useEffect(() => {
    nameRef.current.value='';
    emailRef.current.value='';
    passwordRef.current.value='';
}, []);

  function handleInputChange(e){
    Validation.handleChange(e);
  }

  function ToggleButtonState(){
    const SubmitButton = document.querySelector('.register__button');
    if (!Validation.isValid){
      SubmitButton.setAttribute("disabled", true);
    }
    else{
      SubmitButton.removeAttribute("disabled", true);
    }
  }

  function handleRegisterSubmit(e){
    e.preventDefault();
    const SubmitButton = document.querySelector('.register__button');
    SubmitButton.setAttribute("disabled", true);
    props.onSubmit(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
    SubmitButton.removeAttribute("disabled", true);
    Validation.resetForm();
  }

  return(
    <SignUpIn
      greeting="Добро пожаловать!"
      question="Уже зарегистрированы?"
      linkText="Войти"
      id="sign-in"
      to='/sign-in'
      onLogoClick={props.onLogoClick}
    >
      <form className="register__form" id={props.name} name={props.name} onSubmit={handleRegisterSubmit}>
        <div className="register__field-container" >
          <p className='register__field-name'>Имя</p>
          <input type="text" 
          onChange={handleInputChange}
          className="register__input" 
          ref={nameRef}
          id="name__field" 
          name="user__name" 
          placeholder="" 
          required 
          minLength="2" 
          maxLength="40"/>
          <span className={`register__error ${Validation.errors.user__name !== '' ? 'register__error_enabled' : ''}`} 
          id="profile__name__field-error">
            {Validation.errors.user__name}
          </span>
        </div>
        <div className="register__field-container">
          <p className='register__field-name'>E-mail</p>
          <input type="email" 
          onChange={handleInputChange}
          className="register__input"
          ref={emailRef} 
          id="e_mail__field" 
          name="e_mail" 
          placeholder="example@mail.ru" 
          required 
          minLength="2" 
          maxLength="40"/>
          <span className={`register__error ${Validation.errors.e_mail !== '' ? 'register__error-enabled' : ''}`} 
          id="profile__description__field-error">
            {Validation.errors.e_mail}
          </span>
        </div>
        <div className="register__field-container">
          <p className='register__field-name'>Пароль</p>
          <input type="password"
          onChange={handleInputChange} 
          className="register__input" 
          ref={passwordRef}
          id="password__field" 
          name="password" 
          placeholder="" 
          required 
          minLength="8"/>
          <span className={`register__error ${Validation.errors.user__name !== '' ? 'register__error-enabled' : ''}`}
          id="profile__description__field-error">
            {Validation.errors.password}
          </span>
        </div>
        <button className="register__button" 
        type="submit"         
        >Зарегистрироваться</button>
      </form>

    </SignUpIn>
  ) 
}