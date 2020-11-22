const editButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const likeButton = document.querySelectorAll('.galery__card-like');
const inputName = document.querySelector('#name');
const inputAboutMe = document.querySelector('#aboutMe');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__description');
const saveButton = document.querySelector('.popup__save-button');

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
 