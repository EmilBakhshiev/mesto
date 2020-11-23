let editButton = document.querySelector('.profile__button-edit');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let likeButton = document.querySelectorAll('.galery__card-like');
let inputName = document.querySelector('#name');
let inputAboutMe = document.querySelector('#aboutMe');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__description');
let saveButton = document.querySelector('.popup__save-button');

// открытие и закрытие popup
function openClosePopup(){
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openClosePopup);
closePopupButton.addEventListener('click', openClosePopup);
saveButton.addEventListener('click', openClosePopup);


//Активация и деактивация лайков
function onLikeButton(like){
    like.classList.toggle("galery__card-like_active");
}
for (let i = 0; i < likeButton.length; i++) {
likeButton[i].addEventListener('click', function(e){
   onLikeButton(e.currentTarget);
 });
};

console.log(inputAboutMe.value);

//Работа с формой
inputName.value = profileName.textContent;
inputAboutMe.value = profileAboutMe.textContent;

let formElement = document.querySelector('.popup__container')

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
}

formElement.addEventListener('submit', formSubmitHandler);
 