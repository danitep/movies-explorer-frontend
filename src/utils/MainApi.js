
class MainApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    
  
    _getResponseData(res){
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    } 

    userSignUp(name, email, password){
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              "password": password,
              "email": email,
              "name": name, 
            })
        })
        .then(res => {
          return this._getResponseData(res)
        })   
    }

    userSignIn(email, password){
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              "password": password,
              "email": email 
            })
        })
        .then(res => {
          return this._getResponseData(res)
        })   
      }



    getInitialSavedMovies(JWT) {
      return fetch(`${this._baseUrl}/movies`, {
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        },
      })
      .then(res => {
        return this._getResponseData(res)
      })
    }
    
    getUserInfo(JWT){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        },
      })
      .then(res => {
        return this._getResponseData(res)
      })   
    }
    /*
    getInitialData() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
  */
    redactProfile(name, email, JWT){
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        },
        body: JSON.stringify({
          name,
          email,
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
    }
  
    saveFilm(card, JWT){
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        },
        body: JSON.stringify({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `https://api.nomoreparties.co${card.image.url}`,
          trailerLink: card.trailerLink,
          thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
    }
  
    deleteCard(id, JWT){
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        },
      })
      .then(res => {
        return this._getResponseData(res)
      })
    }
    // другие методы работы с API
  }
  
  const mainApi = new MainApi({
    baseUrl: 'https://api.danitepdiplomfront.nomoredomainswork.ru',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  export default mainApi;
