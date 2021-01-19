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
        this._element.querySelector('.galery__card-remove').addEventListener('click', ()=>{ //Удаление карточки
            this._removeCard();
        })
        this._element.querySelector('.galery__card-like').addEventListener('click',()=>{ //Лайки активны
            this._onLikeButton();
        })
        this._element.querySelector('.galery__card-image').addEventListener('click',()=>{ //Открытие модального окна карточки
            this._openImage({name: this._name, link: this._link});
        })
    }
    _removeEventListeners(){
        this._element.querySelector('.galery__card-remove').removeEventListener('click', ()=>{ //Удаление карточки
            this._removeCard();
        })
        this._element.querySelector('.galery__card-like').removeEventListener('click',()=>{ //Лайки активны
            this._onLikeButton();
        })
        this._element.querySelector('.galery__card-image').removeEventListener('click',()=>{ //Открытие модального окна карточки
            this._openImage({name: this._name, link: this._link});
        })
    }
    _removeCard() {
        this._element.closest('.galery__card').remove();
        this._removeEventListeners();
    }
    _onLikeButton() {
        this._element.querySelector('.galery__card-like').classList.toggle('galery__card-like_active');
    }
    
}