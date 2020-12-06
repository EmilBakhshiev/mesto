let editButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__close-button');
const editPopup = document.querySelector('#editPopup');
let likeButton = document.querySelectorAll('.galery__card-like');
let inputName = document.querySelector('#name');
let inputAboutMe = document.querySelector('#aboutMe');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__description');
let saveButton = document.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('#addCardPopup');
const galeryCardContainer = document.querySelector('.galery');
const templateCard = document.querySelector('.template');
const closePopupAddCard = document.querySelector('#closeAddPopup');
const inputPlaceName = document.querySelector('#placeName');
const inputPlaceImage = document.querySelector('#imageLink');
const createButton = document.querySelector('.popup__create-button');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

console.log(initialCards);
//Добавление карточек из шаблона
    function renderCards(){
        const listItem = initialCards.map(composeCard);
        galeryCardContainer.append(...listItem);
        
    };

    function composeCard(item){
        const newCard = templateCard.content.cloneNode(true);
        const nameCard = newCard.querySelector('.galery__card-title');
        const imageCard = newCard.querySelector('.galery__card-image');
        nameCard.textContent = item.name;
        imageCard.setAttribute('src', item.link);
        function onLikeButton(like){
            like.classList.toggle("galery__card-like_active");
        }
        for (let i = 0; i < likeButton.length; i++) {
        likeButton[i].addEventListener('click', function(e){
           onLikeButton(e.currentTarget);
         });
        };
        return newCard;
    }
    renderCards()
    
// открытие и закрытие popup
// Edit popup
function openCloseEditPopup(){
    editPopup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openCloseEditPopup);
closePopupButton.addEventListener('click', openCloseEditPopup);
saveButton.addEventListener('click', openCloseEditPopup);

//AddCard popup
function openCloseAddCardPopup(){
    addCardPopup.classList.toggle('popup_opened');
}
closePopupAddCard.addEventListener('click', openCloseAddCardPopup);
addButton.addEventListener('click', openCloseAddCardPopup);
createButton.addEventListener('click', openCloseAddCardPopup);

//Активация и деактивация лайков
/*function onLikeButton(like){
    like.classList.toggle("galery__card-like_active");
}
for (let i = 0; i < likeButton.length; i++) {
likeButton[i].addEventListener('click', function(e){
   onLikeButton(e.currentTarget);
 });
};*/

//Работа с формой редактирования профиля
inputName.value = profileName.textContent;
inputAboutMe.value = profileAboutMe.textContent;

let formElement = document.querySelector('.popup__container')

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
}

formElement.addEventListener('submit', formSubmitHandler);

// Добавление новых элементов
function addNewCard(){
    const inputTitle = inputPlaceName.value;
    const newTitleCard = composeCard({ title: inputTitle });
    galeryCardContainer.prepend(newTitleCard);
}


function placeSubmitHandler (evt) {
    evt.preventDefault();
    const newCardTitle = inputPlaceName.value;
    const newCardImage = inputPlaceImage.value;
    const newCardItem = composeCard({ name: newCardTitle, link: newCardImage });
    galeryCardContainer.prepend(newCardItem);
}

addCardPopup.addEventListener('submit', placeSubmitHandler);