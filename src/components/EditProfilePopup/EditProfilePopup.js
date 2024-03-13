import React from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from '../FormValidator/FormValidator';

export default function EditProfilePopup(props){

    const currentUser = React.useContext(CurrentUserContext);

    const Validation = useFormWithValidation();

    


    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email)
    }, [currentUser, props.isOpen]); 


    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');


    React.useEffect(() => {
        ToggleButtonState();
    }, [Validation.isValid, name, email, props.isOpen]); 

    function handleInputNameChange(e){
         Validation.handleChange(e);
         setName(e.target.value);
    }
    function handleInputEmailChange(e){
        Validation.handleChange(e);
        setEmail(e.target.value);
   }
    
    function ToggleButtonState(){
        const SubmitButton = document.querySelector('.popup__button');
        if (!Validation.isValid || name===currentUser.name || email===currentUser.email){
          SubmitButton.setAttribute("disabled", true);
        }
        else{
          SubmitButton.removeAttribute("disabled", true);
        }
    }
      
    function handleSubmit(e) {
        e.preventDefault();
        const SubmitButton = document.querySelector('.popup__button');
        SubmitButton.setAttribute("disabled", true);
        props.onUpdateUser(name, email);
        SubmitButton.removeAttribute("disabled", true);
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            name="account-change"
            title="Редактировать профиль">
            <div className="popup__field-container">
                <input type="text" 
                className="popup__input" 
                id="profile__name__field" 
                name="profile__name" 
                
                value={name || ''} 
                onChange={handleInputNameChange}
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40"/>
                <span className={`popup__error ${Validation.errors.profile__name !== '' ? 'popup__error_enabled' : ''}`}
                id="profile__name__field-error">
                    {Validation.errors.profile__name}
                </span>
            </div>
            <div className="popup__field-container">
                <input type="email" 
                className="popup__input" 
                id="profile__email__field" 
                name="profile__email" 
                
                value={email || ''} 
                onChange={handleInputEmailChange}
                placeholder="Email" 
                required 
                minLength="2" 
                maxLength="40"/>
                <span className={`popup__error ${Validation.errors.profile__email !== '' ? 'popup__error_enabled' : ''}`}
                id="profile__email__field-error">
                    {Validation.errors.profile__email}
                </span>
            </div>
            <button className="popup__button" type="submit">{'Сохранить'}</button>
        </PopupWithForm>
    )
}