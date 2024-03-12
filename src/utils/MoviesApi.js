class MoviesApi {
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
  
  getInitialCards() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res)
    })
    
  }
  // другие методы работы с API
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
      /*
    authorization: '6c4e8e15-fb16-4272-8358-6586683c02aa',
    'Content-Type': 'application/json'
    */
  }
});
export default moviesApi;