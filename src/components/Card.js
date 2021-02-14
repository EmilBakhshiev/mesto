export default class Card {
    constructor(data, cardSelector, handleCardClick, api, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._userId = data.userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        //this._handleLikeClick = handleLikeClick;
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
        /*this._element.querySelector('.galery__card-remove').addEventListener('click', () => { //Удаление карточки
            this._removeCard();
        })*/
        this._likeIсon.addEventListener('click', () => { //Лайки активны
            if (this._likeIсon.classList.contains('galery__card-like_active')){
                this._offLikeButton();
                this._deleteLikeCLick();
            } else {
                this._onLikeButton();
                this._handleLikeClick();
            }
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
        this._likeIсon.classList.add('galery__card-like_active');
    }
    _offLikeButton() {
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
            .then(() => {
                this._likes += 1
                this._likeNumber.textContent = this._likes;
            })
    }
    _deleteLikeCLick() {
        this._api
            .deleteLike(this._id)
            .then(() => {
                this._likes -= 1
                this._likeNumber.textContent = this._likes;
            })
    }
    findMyLike(){
        return Boolean(this.likeId.find((obj => obj._id == this._userId)));
    }
    myLikeOnCard(myLike) {
        if (myLike) {
            this._onLikeButton();
        }
    }
    /*
     _deleteClick = () => {
        this._api
          .removeCard(this._id)
          .then(()=> this._removeCard())
          .catch((err)=> console.log(err))
      }*/
}