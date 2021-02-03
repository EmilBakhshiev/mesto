import Card from '../components/Card.js';
import { initialCards } from './initial-сards.js';
import Validation from '../components/FormValidator.js';
import { validationConfig } from './validationConfig.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__button-edit');
const editPopup = document.querySelector('#edit-popup');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#add-card-popup');
const galeryCardContainer = '.galery';
const imagePopup = document.querySelector('#image-popup');
const closeButtonimagePopup = document.querySelector('#close-image-popup');
const wrapperPopup = document.querySelector('.root');
const formAddCard = document.querySelector('#add-card-form');
const inputPlaceName = formAddCard.querySelector('#place-name');
const inputPlaceImage = formAddCard.querySelector('#image-link');
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


// Edit popup

editButton.addEventListener('click', () => {
    editProfile.open();
    closePopupOnOverlay;
   /* inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;*/
    editProfileFormValidationForm.enableValidation();

});

addButton.addEventListener('click', () => {
    addFormValidationForm.enableValidation();
    classAddCard.open();
})


closeButtonimagePopup.addEventListener('click', () => closePopup(imagePopup));

const userInfo = new UserInfo({
    userNameSelector: profileName, 
    userDescriptionSelector: profileAboutMe
})

const profileForm = new PopupWithForm(editPopup, {
    handleFormSubmit: (formData) =>{
        userInfo.setUserInfo({
            newUser: formData.name,
            newDescription: formData.info
            
        })
        console.log(formData);
    }
})
profileForm.setEventListeners();

//Работа с формой редактирования профиля


/*
function handleFormSubmitProfile() {
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
    editProfile.close();
}*/
//formEditProfile.addEventListener('submit', handleFormSubmitProfile);

// Добавление новых карточек

const formAddInstance = new PopupWithForm(addCardPopup, {
    handleFormSubmit: (formData) => {
        const newCard = new Card(formData, 'template', (formData) => {
            classImagePopup.open(formData)
        });
        const cardElement = newCard.composeCard();
        section.addItem(cardElement);
        console.log(formAddInstance._getInputValues());
    }
})
formAddInstance.setEventListeners();

/*
function handlePlaceSubmitAddCard() {
    const newCardTitle = inputPlaceName.value;
    const newCardImage = inputPlaceImage.value;
    const card = new Card({ name: newCardTitle, link: newCardImage }, 'template', (item) => {
        classImagePopup.open(item)
    });
    const newCardItem = card.composeCard();
    galeryCardContainer.prepend(newCardItem);
    classAddCard.close();
    formAddCard.reset();
}*/


