export default class Card{
    constructor(data, cardSelector, openImage){
        this._name = data.name;
		this._link = data.link;
        this._cardSelector = cardSelector;
        this._openImage = openImage;
    }
    _getTemplate(){
        const newCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.galery__card')
        .cloneNode(true);

        return newCard;
    }
    composeCard () {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.galery__card-title').textContent = this._name;
        const cardImage = this._element.querySelector('.galery__card-image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        
        return this._element;
    }
   
    _setEventListeners(){
        this._element.querySelector('.galery__card-remove').addEventListener('click', ()=>{
            this._removeCard();
        })
        this._element.querySelector('.galery__card-like').addEventListener('click',()=>{
            this._onLikeButton();
        })
    }
    _removeCard() {
        this._element.closest('.galery__card').remove();
    }
    _onLikeButton() {
        this._element.querySelector('.galery__card-like').classList.toggle('galery__card-like_active');
    }
}


/*
function composeCard(item) { //сборка карточки
    const likeButton = newCard.querySelector('.galery__card-like');
    likeButton.addEventListener('click', onLikeButton);
    imageCard.addEventListener('click', function () {
        openImage(item);
    });
    const removeButton = newCard.querySelector('.galery__card-remove');
    removeButton.addEventListener('click', removeCard);
    return newCard;
}
renderCards();*/
