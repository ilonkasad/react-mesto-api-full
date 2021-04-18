export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    setToken() {
        this._headers = {
            'authorization': localStorage.getItem('token'),
            'Accept': 'text/html, application/json',
            'Content-Type': 'application/json'
        }
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._getResponseData(res))
    }

    updateUserInfo(usrInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                usrInfo
            )
        })
            .then(res => this._getResponseData(res))
    }

    addNewCard(cardInfo) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(
                cardInfo
            )
        })
            .then(res => this._getResponseData(res))
    }

    removeCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))
    }

    likeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))
    }

    dislikeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))
    }
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
        })
            .then(res => this._getResponseData(res))

    }
    updateAvatar(avaLink) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                avaLink
            )
        })
            .then(res => this._getResponseData(res))
    }

    //  getAllNeededData() {
    //      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    //  }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

