export default class Card {
    constructor(data, cardSelector, handleCardClick, api, { handleDeleteClick }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._userId = data.userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick
        this._likes = data.likes.length
        this._idOwner = data.owner._id;
        this._id = data._id;
        this._api = api;
        this.likeId = data.likes;
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
        this._likeIсon = this._element.querySelector('.galery__card-like');
        this._setEventListeners();
        this._element.querySelector('.galery__card-title').textContent = this._name;
        const cardImage = this._element.querySelector('.galery__card-image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._likeNumber = this._element.querySelector('.galery__card-like-number');
        this._likeNumber.textContent = this._likes;
        this._notMyBasket();
        this.myLikeOnCard(this.findMyLike());
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.galery__card-remove').addEventListener('click', () => {
            this._handleDeleteClick(this._data);
            
        });

        this._likeIсon.addEventListener('click', () => { //Лайки активны
            if (this._likeIсon.classList.contains('galery__card-like_active')) {
                this._deleteLikeCLick();
                this._offLike();
            } else {
                this._handleLikeClick();
                this._onLike();
            }
        })
        this._element.querySelector('.galery__card-image').addEventListener('click', () => { //Открытие модального окна карточки
            this._handleCardClick({ name: this._name, link: this._link });
        })
    }
    _removeCard() {
        this._element.closest('.galery__card').remove();
        this._element = null;
    }
    _onLike() {
        this._likeIсon.classList.add('galery__card-like_active');
    }
    _offLike() {
        this._likeIсon.classList.remove('galery__card-like_active'); 
    }
    _notMyBasket() {
        if (this._idOwner !== this._userId) {
            this._element.querySelector('.galery__card-remove').remove();
        }
    }
    _handleLikeClick() {
        this._api
            .putLike(this._id)
            .then((res) => {
                this._likes = res.likes.length;
                this._likeNumber.textContent = this._likes;
            })
    }
    _deleteLikeCLick() {
        this._api
            .deleteLike(this._id)
            .then((res) => {
                this._likes = res.likes.length;
                this._likeNumber.textContent = this._likes;
            })
    }
    findMyLike() {
        return Boolean(this.likeId.find((obj => obj._id == this._userId)));
    }
    myLikeOnCard(myLike) {
        if (myLike) {
            this._onLike();
        }
    }
}