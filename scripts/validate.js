const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__error_visible'
}

function showError(form, input, config) { //показ ошибки
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) { //скрытие ошибки
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) { //проверяет валидность
    if (!input.validity.valid) {
        showError(form, input, config);
    } else {
        hideError(form, input, config);
    }
}

function setButtonState(button, isActive, config) { //Выбирает состояние кнопки
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        })
    })
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    });

}

enableValidation(validationConfig);