
export default class Popup {
    constructor(popupSelector){
        this._popup = popupSelector;
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (evt) =>{
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close-button').addEventListener('click', ()=>{
            this.close();
        })
        this._popup.addEventListener('click', (evt) =>{
            const openedPopup = evt.target;
        if (openedPopup.classList.contains('popup_opened')) {
            this.close();
        }
    })    
    }
}