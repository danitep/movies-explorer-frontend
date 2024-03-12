import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { pleaseWaitErrMessage } from '../../utils/constants';


function App() {

  //Для корректного отображения авторизационной интерактивности
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);

  //Для хранения токена
  const [JWT, setJWT] = React.useState('');

  //Для открытия окна уведомлений
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipCorrect, setInfoTooltipCorrect] = React.useState(false);
  const [InfoTooltipMessage, setInfoTooltipMessage] = React.useState('');

  //Для открытия окна редактирования профиля
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  //Для загрузки сохранённого контента
  React.useEffect(() => {
    //cards
    const cardsFromStorage = localStorage.getItem('cards');
    if(cardsFromStorage===null){
      setCards([]);
    }
    else{
      setCards(JSON.parse(cardsFromStorage));
    }
    //savedCards
    const savedCardsFromStorage = localStorage.getItem('savedCards');
    if(savedCardsFromStorage===null){
      setSavedCards([]);
    }
    else{
      setSavedCards(JSON.parse(savedCardsFromStorage));
    }
    //CurrentUser
    const currentUserFromStorage = localStorage.getItem('currentUser');
    if(currentUserFromStorage===null){
      setCurrentUser({name:'', email:''});
    }
    else{
      setCurrentUser(JSON.parse(currentUserFromStorage));
    }
    //токен
    const JWTFromStorage = localStorage.getItem('token');
    if(JWTFromStorage===null){
      setJWT();
    }
    else{
      setJWT(JWTFromStorage);
    }
  }, [loggedIn]); 


  //Для перенаправления на другие страницы
  const navigate = useNavigate()

  //Для нажатия по логотипу
  function handleLogoClick(){
    navigate('/', {replace: true});
  }


  //Для выхода из аккаунта
  function handleUserExit(){
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('cards');
    localStorage.removeItem('savedCards');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('keyword');
    localStorage.removeItem('isShortMovie');
    localStorage.removeItem('savedMoviesKeyword');
    localStorage.removeItem('isShortSavedMovie');
  }


  //Для входа в аккаунт
  function handleUserSignIn(email, password){
    mainApi.userSignIn(email, password)
    .then((data)=>{
      setLoggedIn(true)
      setJWT(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('loggedIn', true);
      navigate('/movies', {replace: true});
      return data.token;
    })
    .then((token)=>{
      mainApi.getUserInfo(token)
      .then((resProfile)=>{
        setCurrentUser(resProfile);
        localStorage.setItem('currentUser', JSON.stringify(resProfile));
        setInfoTooltipCorrect(true)
        handleInfoTooltip(`Добро пожаловать, ${resProfile.name}!`)
      })
      .catch(()=>{
        setInfoTooltipCorrect(false)
        handleInfoTooltip('Не удалось загрузить данные профиля')
      })
    })
    .catch(()=>{
      setInfoTooltipCorrect(false)
      handleInfoTooltip('Неверный логин или пароль')
    });
         
  }

  //Для регистрации
  function handleUserSignUp(name, email, password){
    mainApi.userSignUp(name, email, password)
    .then((data)=>{
      handleUserSignIn(data.email, password)
    })
    .catch((err)=>{
      setInfoTooltipCorrect(false)
      handleInfoTooltip(err + ' Пользователь с такой почтой уже есть')
    });
  }

  //Для обновления профиля
  function handleUserUpdate(name){
    mainApi.redactProfile(name, JWT)
    .then((data)=>{
      setCurrentUser(data)
      closeAllPopups();
      setInfoTooltipCorrect(true)
      handleInfoTooltip('Вы успешно сменили имя')
    })
    .catch((err) => {
      closeAllPopups();
      setInfoTooltipCorrect(false)
      handleInfoTooltip(pleaseWaitErrMessage);
    })
  }

  //Для отображения уведомлений
  function closeAllPopups(){
    setInfoTooltipOpen(false);
    setEditProfilePopupOpen(false);
  }
  function handleInfoTooltip(message){
    setInfoTooltipOpen(true);
    setInfoTooltipMessage(message)
  }
  function handleEditProfile(){
    setEditProfilePopupOpen(true);
  }

  //Для поиска фильмов
  function filterMovies(resCards, keyword, isShortMovie){

    const key = keyword.toLowerCase();

    let isInEnglish = false;
    let isInRussian = false;
    let isShort = false;
    let isCorrect = false;

    if(isShortMovie){ //короткометражки
      let nextState = resCards.filter((c) => {
        isInEnglish = c.nameEN.toLowerCase().includes(key);
        isInRussian = c.nameRU.toLowerCase().includes(key);
        isShort = c.duration < 40;
        isCorrect = (isInEnglish || isInRussian) && isShort;
        return(isCorrect && c);
        })
      return(nextState);
    }
    else{
      let nextState = resCards.filter((c) => {
        isInEnglish = c.nameEN.toLowerCase().includes(key);
        isInRussian = c.nameRU.toLowerCase().includes(key);
        isCorrect = isInEnglish || isInRussian;
        return(isCorrect && c);
      })
      return(nextState);
    }  
  }


  function handleExtraFilter(){
    if(window.location.pathname === '/movies'){
      setCards((state)=>{
        let nextState = state.filter((c)=>{
          return c.duration <= 40;
        });
        localStorage.setItem('isShortMovie', JSON.stringify(true));
        localStorage.setItem('cards', JSON.stringify(nextState));
        return(nextState);
      })
      
    } 
    else{
      setSavedCards((state)=>{
        let nextState = state.filter((c)=>{
          return c.duration <= 40;
        });
        localStorage.setItem('savedCards', JSON.stringify(nextState));
        localStorage.setItem('isShortSavedMovie', JSON.stringify(true));
        return(nextState);
      })
      
    }
  }
 
  //Для отправки запроса по поиску фильма
  function handleSearchSubmit(keyword, isShortMovie){
    if(keyword.length>=1){
      return moviesApi.getInitialCards()
      .then((resCards)=>{
        const moviesCards = filterMovies(resCards, keyword, isShortMovie);
        setCards(moviesCards);
        localStorage.setItem('cards', JSON.stringify(moviesCards));
        localStorage.setItem('keyword', JSON.stringify(keyword));
        localStorage.setItem('isShortMovie', JSON.stringify(isShortMovie));
      })
      .catch((err) => {
        setInfoTooltipCorrect(false)
        handleInfoTooltip(pleaseWaitErrMessage);
      })
    }
    else{
      setInfoTooltipCorrect(false)
      handleInfoTooltip('Нужно ввести ключевое слово')
      return new Promise(function (resolve) {
        resolve('');
      });
    }
  }

  //Для сохранения фильмов(карточек)
  function handleSaveCard(card){
    return mainApi.saveFilm(card, JWT)
    .then((card)=>{
      return true;
    })
    .catch((err)=>{
      setInfoTooltipCorrect(false)
      handleInfoTooltip(`${err} Некорректно введённые данные`)
      //return false;
    })
  }

  //Для удаления карточки из сохранённых
  function handleCardDelete(card){
    return mainApi.deleteCard(window.location.pathname === '/movies'? card.id : card.movieId, JWT)
    .then((card)=>{
      if(window.location.pathname === '/saved-movies'){
        setSavedCards((state)=>{
          let nextState = state.filter((c)=>{
            return card.movieId !== c.movieId;
          });
          localStorage.setItem('savedCards', JSON.stringify(nextState));
          return(nextState);
        })
      }
      return true;
    })
    .catch((err)=>{
      setInfoTooltipCorrect(false)
      handleInfoTooltip(`${err} Нечего удалять`)
      return false;
    })
  }

  //для загрузки сохранённых фильмов 
  function handleSavedFilmsSubmit(keyword, isShortMovie){
    if(keyword.length>=1){
      return mainApi.getInitialSavedMovies(JWT)
      .then((resCards)=>{
        const savedMoviesCards = filterMovies(resCards, keyword, isShortMovie);
        setSavedCards(savedMoviesCards);
        localStorage.setItem('savedCards', JSON.stringify(savedMoviesCards));
        localStorage.setItem('savedMoviesKeyword', JSON.stringify(keyword));
        localStorage.setItem('isShortSavedMovie', JSON.stringify(isShortMovie));
      })
      .catch((err) => {
        if(!err.includes('404')){ //Т.к. на 404 будет появляться надпись "Ничего не найдено"
          setInfoTooltipCorrect(false)
          handleInfoTooltip(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`)
        }
        localStorage.setItem('savedCards', JSON.stringify([]));
        setSavedCards([]);
        
      })
    }
    else{
      setInfoTooltipCorrect(false)
      handleInfoTooltip('Нужно ввести ключевое слово')
      return new Promise();
    }
  }


  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Routes>
      <Route path="/" element={
        <>
          <Main
            isloggedIn={loggedIn}
            onLogoClick={handleLogoClick}
          />
          <Footer/>
        </>
      }/>
      <Route path="/movies" element={
        loggedIn?
        <>
          <Movies
            isloggedIn={loggedIn}
            cards={cards}
            onLogoClick={handleLogoClick}
            onSearchSubmit={handleSearchSubmit}
            onSave={handleSaveCard}
            onCardDelete={handleCardDelete}
            onSwitchClick={handleExtraFilter}
          />
        </>
        :
        <Navigate to="/" replace/>
      }/>
      <Route path="/saved-movies" element={
        loggedIn?
        <SavedMovies
        isloggedIn={loggedIn}
        cards={savedCards}
        onCardDelete={handleCardDelete}
        onLogoClick={handleLogoClick}
        onSearchSubmit={handleSavedFilmsSubmit}
        />
        :
        <Navigate to="/" replace/>
      }/>
      <Route path="/profile" element={
        loggedIn?
        <Profile
          isloggedIn={loggedIn}
          name='Виталий'
          onExit={handleUserExit}
          onLogoClick={handleLogoClick}
          onRedact={handleEditProfile}
        />
        :
        <Navigate to="/" replace/>
      }/>
      <Route path="/sign-in" element={
        <Login 
          onSubmit={handleUserSignIn}
          onLogoClick={handleLogoClick}
        />
      }/>
      <Route path="/sign-up" element={
        <Register
        onSubmit={handleUserSignUp}
        onLogoClick={handleLogoClick}
        />
      }/>
      <Route path="/:any" element={<NotFoundPage/>}/>
    </Routes>
    <InfoTooltip
    name="info-tool-tip"
    onClose={closeAllPopups}
    isOpen={isInfoTooltipOpen}
    isCorrect={isInfoTooltipCorrect}
    message={InfoTooltipMessage}
    >
    </InfoTooltip>
    <EditProfilePopup
    name="edit-profile-popup"
    onClose={closeAllPopups}
    isOpen={isEditProfilePopupOpen}
    onUpdateUser={handleUserUpdate}
    ></EditProfilePopup>
  </CurrentUserContext.Provider>
  );
}

export default App;
