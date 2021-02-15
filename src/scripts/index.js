import Card from '../components/Card.js';
import Validation from '../components/FormValidator.js';
import { validationConfig } from './validationConfig.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import Api from '../components/Api.js';
import DeletePopup from '../components/DeletePopup.js'

const avatar = document.querySelector('.profile__avatar');
const editAvatarPopup = document.querySelector('#avatar-popup');
const avatarForm = document.querySelector('#avatar-form');
const updateAvatarButton = avatarForm.querySelector('.popup__create-button');
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
const submitButtonAddCard = formAddCard.querySelector('.popup__button');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
let userId = null;
let tamplateCard = null;


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        authorization: '204a3dbb-e697-4073-846c-574c3a07e2d3',
        'Content-Type': 'application/json'
    }
})


api.getProfileInfo()
    .then((result) => {
        userId = result._id;
        userInfo.setUserInfo(result);
        userInfo.setAvatar(result);
    })
    .catch((err) => {
        console.log(err);
      });


api.getInitialCards()
    .then((res) => {
        section.renderItems(res);
    })
    .catch((err) => {
        console.log(err);
      });



const section = new Section({
    renderer: (item) => {
        section.addItem(createCard(item));
    }
},
    galeryCardContainer
)
const deletePopupInstance = new DeletePopup(deleteCardPopup, {
    handleFormSubmit: (data) => {
        api.removeCard(data)
            .then(() => {
                tamplateCard.remove();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
deletePopupInstance.setEventListeners();

function createCard(item) { //Создание экземпляра класса Card
    const cardInstance = new Card({ ...item, userId },
        'template',
        (item) => { classImagePopup.open(item) },
        api, {
        handleDeleteClick: (item) => {
            deletePopupInstance.open(item);
            tamplateCard = card;
        }
    });
    const card = cardInstance.composeCard();
    return card;
}

//Валидация форм
const addFormValidationForm = new Validation(validationConfig, formAddCard); //Валидация формы добавления карточек
addFormValidationForm.enableValidation();

const editProfileFormValidationForm = new Validation(validationConfig, formEditProfile); //Валидация формы редактирования профиля
editProfileFormValidationForm.enableValidation();

const avatarFormValidation = new Validation(validationConfig, avatarForm);
avatarFormValidation.enableValidation();


//Добавление карточек из шаблонаЫ
const classImagePopup = new PopupWithImage(imagePopup);
classImagePopup.setEventListeners();



//Создание нового экземпляра попапов
const formAddInstance = new PopupWithForm(addCardPopup, {
    handleFormSubmit: (formData) => {
        formAddInstance.renderLoading(false);
        api.postCard(formData)
            .then((formData) => {
                section.addItem(createCard(formData));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                formAddInstance.renderLoading(true);
            })
    }
})

formAddInstance.setEventListeners();


const editProfile = new PopupWithForm(editPopup, {
    handleFormSubmit: (formData) => {
        editProfile.renderLoading(false);
        api.editProfile(formData)
            .then((formData) => {
                userInfo.setUserInfo(formData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                editProfile.renderLoading(true);
            })
    }
})

editProfile.setEventListeners();

const avatarInstance = new PopupWithForm(editAvatarPopup, {
    handleFormSubmit: (formData) => {
        avatarInstance.renderLoading(false);
        api.updateAvatar(formData)
            .then((formData) => {
                userInfo.setAvatar(formData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                avatarInstance.renderLoading(true);
            })
    }
})
avatarInstance.setEventListeners();

editAvatarButton.addEventListener('click', () => {
    avatarFormValidation.setButtonState(updateAvatarButton, avatarForm.checkValidity());
    avatarInstance.open();
})

editButton.addEventListener('click', () => { //Обработчик событий кнопки редактирования профиля
    editProfile.open();
    const infoUser = userInfo.getUserInfo();
    inputName.value = infoUser.userName;
    inputAboutMe.value = infoUser.aboutMe;
});

const userInfo = new UserInfo(profileName, profileAboutMe, avatar);



addButton.addEventListener('click', () => { //Обработчик событий кнопки добавления карточек
    addFormValidationForm.setButtonState(submitButtonAddCard, formAddCard.checkValidity());
    formAddInstance.open();
})