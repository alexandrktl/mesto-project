let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');



function closeEditProfilePopup() {
    popup.classList.remove('popup_opened');
}
function openEditProfilePopup(){
    popup.classList.add('popup_opened');
}


popupCloseButton.addEventListener('click', closeEditProfilePopup);
profileEditButton.addEventListener('click', openEditProfilePopup);


