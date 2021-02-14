
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
    
}
_getInputValues(){
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
}
setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();

})
}
close(){
    super.close();
    this._form.reset();
}/*
renderLoading(isLoading){
    const loadButton = this._form.querySelector('#load-button');
    const submitButton = this._form.querySelector('.popup__button');
    if(isLoading){
        submitButton.classList.add('popup__hide-button');
        loadButton.classList.remove('popup__hide-button');
    }else{
        submitButton.classList.remove('popup__hide-button');
        loadButton.classList.add('popup__hide-button');
    }
}*/
}