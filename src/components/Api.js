export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers
    }
    getInitialCards() {
        return fetch(`${this._url}cards`, {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            });
    }
    getProfileInfo() {
        return fetch(`${this._url}users/me`, {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            })

    }
    editProfile(formData) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    postCard(newCard) {
        return fetch(`${this._url}cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: newCard.name,
                    link: newCard.link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    removeCard(item) {
        return fetch(`${this._url}cards/${item._id}`, {
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
    putLike(id){
        return fetch(`${this._url}cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    deleteLike(id){
        return fetch(`${this._url}cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    updateAvatar(linkAvatar){
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: linkAvatar.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
       
    }
}