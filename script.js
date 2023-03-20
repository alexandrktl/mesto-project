let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupSaveButton = document.querySelector('.popup__save-button')
let profileName = document.querySelector('.profile__name-text');
let profileDescriptionText = document.querySelector('.profile__description-text');
let insertedName = document.querySelector('.popup__input_text_person-name');
let insertedDescription = document.querySelector('.popup__input_text_description-of-person');
let likeButtton = document.querySelector('place-card__like-button');



//закрыть попап
function closeEditProfilePopup() {
    popup.classList.remove('popup_opened');
    transferTextFromHeader();
}
//открыть попап
function openEditProfilePopup() {
    popup.classList.add('popup_opened');
}

//перенос текста из профиля в попап
function transferTextFromHeader() {
    insertedName.value = (profileName.textContent)
    insertedDescription.value = (profileDescriptionText.textContent)
}
transferTextFromHeader();

//перенос текста из попапа в профиль
function transferTextFromPopup(event) {
    profileName.textContent = insertedName.value
    profileDescriptionText.textContent = insertedDescription.value
    closeEditProfilePopup()
    event.preventDefault()
}


//кнопка закрыть попап
popupCloseButton.addEventListener('click', closeEditProfilePopup);
//кнопка открыть попап
profileEditButton.addEventListener('click', openEditProfilePopup);
//кнопка сохранить в попапе
popupSaveButton.addEventListener('click', transferTextFromPopup);








