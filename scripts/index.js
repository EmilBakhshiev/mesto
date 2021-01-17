const editButton = document.querySelector('.profile__button-edit');
const popupProfileButtonClose = document.querySelector('#close-edit-popup');
const editPopup = document.querySelector('#edit-popup');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#add-card-popup');
const galeryCardContainer = document.querySelector('.galery');
const templateCard = document.querySelector('template');
const closePopupAddCard = document.querySelector('#close-add-popup');
const createButton = document.querySelector('.popup__create-button');
const imagePopup = document.querySelector('#image-popup');
const closeButtonimagePopup = document.querySelector('#close-image-popup');
const fullSizeImage = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');
const root = document.querySelector('.root');
const formAddCard = document.querySelector('#add-card-form');
const inputPlaceName = formAddCard.querySelector('#place-name');
const inputPlaceImage = formAddCard.querySelector('#image-link');
const formEditProfile = document.querySelector('#edit-profile-form');
const inputName = formEditProfile.querySelector('#name');
const inputAboutMe = formEditProfile.querySelector('#about-me');


//Добавление карточек из шаблона
function renderCards() { //рендеринг карточек
    const listItem = initialCards.map(composeCard);
    galeryCardContainer.append(...listItem);
};

function composeCard(item) { //сборка карточки
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
document.addEventListener('click', closePopupOnOverlay);


// Edit popup

editButton.addEventListener('click', () => {
    openPopup(editPopup);
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

//Активация и деактивация лайков
function onLikeButton(event) {
    event.target.classList.toggle('galery__card-like_active');
}

//Работа с формой редактирования профиля

function handleFormSubmitProfile() {
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
    closePopup(editPopup);
}
formEditProfile.addEventListener('submit', handleFormSubmitProfile);

// Добавление новых карточек
function handlePlaceSubmitAddCard() {
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