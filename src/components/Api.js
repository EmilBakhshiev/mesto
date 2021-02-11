export default class Api {
    constructor(options) {
        this.options = options
    }
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
                headers: {
                    authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                console.log(result);
                return result;
            });
    }
    getProfileInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
                headers: {
                    authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3'
                }
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
            .catch((err) => {
                console.log(err);
            });
    }
    editProfile() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector('.profile__name').textContent,
                about: document.querySelector('.profile__description').textContent
            })
        })
    }
    postCard(newCard) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards', {
                method: 'POST',
                headers: {
                    authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
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
            .catch((err) => {
                console.log(err);
            });
    }
}