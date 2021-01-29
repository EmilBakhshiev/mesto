import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageName = this._popup.querySelector('.popup__caption');
    }
    open(data){
        super.open()
        this._image.src = data.src;
        this._image.alt = data.name;
        this._imageName.textContent = data.name;
    }
}