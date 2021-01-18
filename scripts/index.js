import Card from './Card.js';
import { initialCards } from './initial-сards.js';



const editButton = document.querySelector('.profile__button-edit');
const popupProfileButtonClose = document.querySelector('#close-edit-popup');
const editPopup = document.querySelector('#edit-popup');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#add-card-popup');
const galeryCardContainer = document.querySelector('.galery');
const closePopupAddCard = document.querySelector('#close-add-popup');
const createButton = document.querySelector('.popup__create-button');
const imagePopup = document.querySelector('#image-popup');
const closeButtonimagePopup = document.querySelector('#close-image-popup');
const fullSizeImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');
const wrapperPopup = document.querySelector('.popup__wrapper');
const formAddCard = document.querySelector('#add-card-form');
const inputPlaceName = formAddCard.querySelector('#place-name');
const inputPlaceImage = formAddCard.querySelector('#image-link');
const formEditProfile = document.querySelector('#edit-profile-form');
const inputName = formEditProfile.querySelector('#name');
const inputAboutMe = formEditProfile.querySelector('#about-me');

//Добавление карточек из шаблона

initialCards.forEach((item) => {
    const card = new Card(item, 'template', openImage);
    const cardElements = card.composeCard();
    galeryCardContainer.append(cardElements);
})

// открытие и закрытие popup

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscBtn);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEscBtn);
}

function closePopupOnEscBtn(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function closePopupOnOverlay(evt) {
    const closeButton = evt.target;
    if (closeButton.classList.contains('popup')) {
        closeButton.closest('.popup').classList.remove('popup_opened');
    }
}

wrapperPopup.addEventListener('click', closePopupOnOverlay);


// Edit popup

editButton.addEventListener('click', () => {
    openPopup(editPopup);
    closePopupOnOverlay;
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
});
popupProfileButtonClose.addEventListener('click', () => closePopup(editPopup));


//AddCard popup
closePopupAddCard.addEventListener('click', () => closePopup(addCardPopup));
addButton.addEventListener('click', () => {
    setButtonState(createButton, formAddCard.checkValidity(), validationConfig);
    openPopup(addCardPopup);
})

//Image popup
function openImage(item) {
    fullSizeImage.src = item.link;
    fullSizeImage.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(imagePopup);
};
closeButtonimagePopup.addEventListener('click', () => closePopup(imagePopup));



//Работа с формой редактирования профиля

function handleFormSubmitProfile(evt) {
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
    closePopup(editPopup);
}
formEditProfile.addEventListener('submit', handleFormSubmitProfile);

// Добавление новых карточек
function handlePlaceSubmitAddCard() {
    const newCardTitle = inputPlaceName.value;
    const newCardImage = inputPlaceImage.value;
    const card = new Card ({name: newCardTitle, link: newCardImage}, 'template', openImage);
    const newCardItem = card.composeCard();
    galeryCardContainer.prepend(newCardItem);
    closePopup(addCardPopup);
    formAddCard.reset();
}

formAddCard.addEventListener('submit', handlePlaceSubmitAddCard);
