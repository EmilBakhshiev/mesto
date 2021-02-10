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
            });
    }
    getProfileInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
                headers: {
                    authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3'
                }
            })
            .then(res => res.json())
            .then((result) => {
                return result
            })
            .then((userInfo) => {
                const profileName = document.querySelector('.profile__name');
                const profileAbout = document.querySelector('.profile__description');
                profileName.textContent = userInfo.name;
                profileAbout.textContent = userInfo.about;

            })
    }
    editProfile() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
                method: 'POST',
                headers: {
                    authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3'
                }
            })
            .then()
    }
}