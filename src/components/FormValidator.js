export default class Validation {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
    }

    _showError(input) { //показ ошибки
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input) { //скрытие ошибки
        const error = this._formSelector.querySelector(`#${input.id}-error`);
        error.textContent = "";
        input.classList.remove(this._config.inputErrorClass);
    }

    _checkInputValidity(input) { //проверяет валидность
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }
    setButtonState(button, isActive) { //Выбирает состояние кнопки
        if (isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListener() {
        const inputList = this._formSelector.querySelectorAll(this._config.inputSelector);
        const submitButton = this._formSelector.querySelector(this._config.submitButtonSelector);
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.setButtonState(submitButton, this._formSelector.checkValidity());
            })
        })
    }

    enableValidation() {
        this._setEventListener();
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
        const submitButton = this._formSelector.querySelector(this._config.submitButtonSelector);
        this.setButtonState(submitButton, this._formSelector.checkValidity());

    }
}