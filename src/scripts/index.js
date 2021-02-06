import Card from '../components/Card.js';
import { initialCards } from './initial-сards.js';
import Validation from '../components/FormValidator.js';
import { validationConfig } from './validationConfig.js';
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
const formAddCard = document.querySelector('#add-card-form');
const formEditProfile = document.querySelector('#edit-profile-form');
const inputName = formEditProfile.querySelector('#name');
const inputAboutMe = formEditProfile.querySelector('#about-me');
const submitButtonAddCard = formAddCard.querySelector('.popup__button');

function createCard(item, popupSelector, handleCardClick) {
    const cardInstance = new Card(item, popupSelector, handleCardClick);
    const card = cardInstance.composeCard();
    return card;
}

//Валидация форм
const addFormValidationForm = new Validation(validationConfig, formAddCard); //Валидация формы добавления карточек
addFormValidationForm.enableValidation();

const editProfileFormValidationForm = new Validation(validationConfig, formEditProfile); //Валидация формы редактирования профиля
editProfileFormValidationForm.enableValidation();

//Добавление карточек из шаблонаЫ
const classImagePopup = new PopupWithImage(imagePopup);
classImagePopup.setEventListeners();

const section = new Section({
    item: initialCards,
    renderer: (item) => {
        section.addItem(createCard(item, 'template', (item) => {classImagePopup.open(item)}));
    }
},
    galeryCardContainer
);

section.renderItems();

//Создание нового экземпляра попапов
const formAddInstance = new PopupWithForm(addCardPopup, {
    handleFormSubmit: (formData) => {
        section.addItem(createCard(formData, 'template', (formData) => {classImagePopup.open(formData)}));
    }
})
formAddInstance.setEventListeners();


const editProfile = new PopupWithForm(editPopup, {
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo({
            newUser: formData.name,
            newDescription: formData.info
        })
    }
})

editProfile.setEventListeners();


//Работа с формой редактирования профиля

editButton.addEventListener('click', () => { //Обработчик событий кнопки редактирования профиля
    editProfile.open();
    const infoUser = userInfo.getUserInfo();
    inputName.value = infoUser.userName;
    inputAboutMe.value = infoUser.aboutMe;
});

const userInfo = new UserInfo({
    userNameSelector: profileName,
    userDescriptionSelector: profileAboutMe
})

// Добавление новых карточек

addButton.addEventListener('click', () => { //Обработчик событий кнопки добавления карточек
    addFormValidationForm.setButtonState(submitButtonAddCard, formAddCard.checkValidity());
    formAddInstance.open();
})

