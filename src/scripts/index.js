import Card from '../components/Card.js';
import { initialCards } from './initial-сards.js';
import Validation from '../components/FormValidator.js';
import { validationConfig } from './validationConfig.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const editButton = document.querySelector('.profile__button-edit');
const editPopup = document.querySelector('#edit-popup');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#add-card-popup');
const galeryCardContainer = '.galery';
const imagePopup = document.querySelector('#image-popup');
const wrapperPopup = document.querySelector('.root');
const formAddCard = document.querySelector('#add-card-form');
const formEditProfile = document.querySelector('#edit-profile-form');
const inputName = formEditProfile.querySelector('#name');
const inputAboutMe = formEditProfile.querySelector('#about-me');

//Валидация форм
const addFormValidationForm = new Validation(validationConfig, formAddCard);
const editProfileFormValidationForm = new Validation(validationConfig, formEditProfile);

//Добавление карточек из шаблонаЫ
const classImagePopup = new PopupWithImage(imagePopup);
classImagePopup.setEventListeners();

const section = new Section({
    item: initialCards,
    renderer: (item) => {
        const card = new Card(item, 'template', (item) => { classImagePopup.open(item) });
        const cardElements = card.composeCard();
        section.addItem(cardElements)
    }
},
    galeryCardContainer
);

section.renderItems();

//Создание нового экземпляра попапов
const classAddCard = new Popup(addCardPopup); //Модалка Добавление карточек
classAddCard.setEventListeners();

const editProfile = new Popup(editPopup); //Модалка редактирования профиля
editProfile.setEventListeners();


function closePopupOnOverlay(evt) {
    const closeButton = evt.target;
    if (closeButton.classList.contains('popup')) {
        closeButton.closest('.popup').classList.remove('popup_opened');
    }
}

wrapperPopup.addEventListener('click', closePopupOnOverlay);


//Работа с формой редактирования профиля

editButton.addEventListener('click', () => { //Обработчик событий кнопки редактирования профиля
    editProfile.open();
    const infoUser = userInfo.getUserInfo();
    inputName.value = infoUser.userName;
    inputAboutMe.value = infoUser.aboutMe;
    closePopupOnOverlay;
    editProfileFormValidationForm.enableValidation();

});

const userInfo = new UserInfo({
    userNameSelector: profileName,
    userDescriptionSelector: profileAboutMe
})

const profileForm = new PopupWithForm(editPopup, {
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo({
            newUser: formData.name,
            newDescription: formData.info
        })
    }
})
profileForm.setEventListeners();

// Добавление новых карточек

addButton.addEventListener('click', () => { //Обработчик событий кнопки добавления карточек
    addFormValidationForm.enableValidation();
    classAddCard.open();
})

const formAddInstance = new PopupWithForm(addCardPopup, { 
    handleFormSubmit: (formData) => {
        const newCard = new Card(formData, 'template', (formData) => {
            classImagePopup.open(formData)
        });
        const cardElement = newCard.composeCard();
        section.addItem(cardElement);
    }
})
formAddInstance.setEventListeners();
