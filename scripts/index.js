const editButton = document.querySelector('.profile__button-edit');
const popupProfileButtonClose = document.querySelector('#close-edit-popup');
const editPopup = document.querySelector('#edit-popup');
const inputName = document.querySelector('#name');
const inputAboutMe = document.querySelector('#about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const saveButton = document.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#add-card-popup');
const galeryCardContainer = document.querySelector('.galery');
const templateCard = document.querySelector('template');
const closePopupAddCard = document.querySelector('#close-add-popup');
const inputPlaceName = document.querySelector('#place-name');
const inputPlaceImage = document.querySelector('#image-link');
const createButton = document.querySelector('.popup__create-button');
const imagePopup = document.querySelector('#image-popup');
const closeButtonimagePopup = document.querySelector('#close-image-popup');
const fullSizeImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

//Добавление карточек из шаблона
function renderCards() {
    const listItem = initialCards.map(composeCard);
    galeryCardContainer.append(...listItem);
};

function composeCard(item) {
    const newCard = templateCard.content.cloneNode(true);
    const nameCard = newCard.querySelector('.galery__card-title');
    const imageCard = newCard.querySelector('.galery__card-image');
    const likeButton = newCard.querySelector('.galery__card-like');
    likeButton.addEventListener('click', onLikeButton);
    nameCard.textContent = item.name;
    imageCard.src = item.link;
    imageCard.alt = item.name;
    imageCard.addEventListener('click', function () {
        openImage(item);
    });
    const removeButton = newCard.querySelector('.galery__card-remove');
    removeButton.addEventListener('click', removeCard);
    return newCard;
}
renderCards();

// открытие и закрытие popup

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
// Edit popup
editButton.addEventListener('click', () => {
    openPopup(editPopup);
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
});
popupProfileButtonClose.addEventListener('click', () => closePopup(editPopup));

//AddCard popup
closePopupAddCard.addEventListener('click', () => closePopup(addCardPopup));
addButton.addEventListener('click', () => openPopup(addCardPopup));

//Image popup
function openImage(item) {
    fullSizeImage.src = item.link;
    fullSizeImage.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(imagePopup);
};
closeButtonimagePopup.addEventListener('click', () => closePopup(imagePopup));

//Активация и деактивация лайков
function onLikeButton(event) {
    event.target.classList.toggle('galery__card-like_active');
}

//Работа с формой редактирования профиля
const formEditProfile = document.querySelector('#edit-profile-form');

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
    closePopup(editPopup);
}
formEditProfile.addEventListener('submit', handleFormSubmitProfile);

// Добавление новых карточек
const formAddCard = document.querySelector('#add-card-form');
function handlePlaceSubmitAddCard(evt) {
    evt.preventDefault();
    const newCardTitle = inputPlaceName.value;
    const newCardImage = inputPlaceImage.value;
    const newCardItem = composeCard({ name: newCardTitle, link: newCardImage });
    galeryCardContainer.prepend(newCardItem);
    closePopup(addCardPopup);
    formAddCard.reset();
}
formAddCard.addEventListener('submit', handlePlaceSubmitAddCard);

//Удаление карточек
function removeCard(event) {
    event.target.closest('.galery__card').remove();
}