
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
}
_getInputValues(){
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name, input.link] = input.value;
      });
      return this._formValues;
}
setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
})


}
close(){
    super.close();
    this._popup.reset();
}
}