export default function PopupWithForm(props){
    return(
    <div className={`popup popup_type_${props.name} ${props.isOpen?'popup_opened':''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form className="popup__form" id={props.name} name={props.name} onSubmit={props.onSubmit} noValidate>
          {props.children}
          
        </form>
      </div>
    </div>
    )
}