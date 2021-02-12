import Card from '../components/Card.js';
import { initialCards } from './initial-сards.js';
import Validation from '../components/FormValidator.js';
import { validationConfig } from './validationConfig.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';

const avatar = document.querySelector('.profile__avatar');
const editAvatarPopup = document.querySelector('#avatar-popup');
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
const deleteCardPopup = document.querySelector('#delete-card-popup');
const deleteCardForm = document.querySelector('#delete-card-form');
const submitButtonAddCard = formAddCard.querySelector('.popup__button');

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3',
        'Content-Type': 'application/json'
    }
})


api.getProfileInfo()
    .then((result) => {
        profileName.textContent = result.name;
        profileAboutMe.textContent = result.about;
        avatar.src = result.avatar;
    })


api.getInitialCards()
    .then((res) => {
        section.renderItems(res);
    })



const section = new Section({
        renderer: (item) => {
            section.addItem(createCard(item, 'template', (item) => { classImagePopup.open(item) }));
        }
    },
    galeryCardContainer
)


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



//Создание нового экземпляра попапов
const formAddInstance = new PopupWithForm(addCardPopup, {
    handleFormSubmit: (formData) => {
        api.postCard(formData)
            .then((formData) => {
                section.addItem(createCard(formData, 'template', (formData) => { classImagePopup.open(formData) }));
            })
            .catch((err) => {
                console.log(err);
            });
    }
})

formAddInstance.setEventListeners();


const editProfile = new PopupWithForm(editPopup, {
    handleFormSubmit: (formData) => {
        api.editProfile(formData)
            .then((formData) => {
                userInfo.setUserInfo({
                    newUser: formData.name,
                    newDescription: formData.about
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
})

editProfile.setEventListeners();

const avatarInstance = new PopupWithForm(editAvatarPopup, {
    handleFormSubmit: (formData) => {
        avatar.src = formData.link;
    }
})
avatarInstance.setEventListeners();

avatar.addEventListener('click', () => {
    avatarInstance.open();
})

const deletePopupInstance = new Popup(deleteCardPopup);
deletePopupInstance.setEventListeners();

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