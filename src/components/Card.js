export default class Card {
    constructor(data, cardSelector, api, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick
        this._likes = data.likes.length
        this._userId = data.owner._id;
        this._api = api;
    }
    _getTemplate() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.galery__card')
            .cloneNode(true);

        return newCard;
    }
    composeCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.galery__card-title').textContent = this._name;
        const cardImage = this._element.querySelector('.galery__card-image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.galery__card-like-number').textContent = this._likes;
        this._notMyBasket();

        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.galery__card-remove').addEventListener('click', () => { //Удаление карточки
            this._removeCard();
        })
        this._element.querySelector('.galery__card-like').addEventListener('click', () => { //Лайки активны
            this._onLikeButton();
        })
        this._element.querySelector('.galery__card-image').addEventListener('click', () => { //Открытие модального окна карточки
            this._handleCardClick({ name: this._name, link: this._link });
        })
        this._element.querySelector('.galery__card-remove').addEventListener('click', () => { //Открытие модального окна удаления карточки
            this._handleDeleteClick();
        })
    }
    _removeCard() {
        this._element.closest('.galery__card').remove();
        this._element = null;
    }
    _onLikeButton() {
        this._element.querySelector('.galery__card-like').classList.toggle('galery__card-like_active');
    }
    _notMyBasket() {
        if (this._userId !== '7fb3b6b848a83f9c0f7da4bd') {
            this._element.querySelector('.galery__card-remove').classList.remove('galery__card-remove');
        }

    }
}