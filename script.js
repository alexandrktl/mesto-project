const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');// закрыть попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupSaveButton = document.querySelector('.popup__save-button')
const profileName = document.querySelector('.profile__name-text');
const profileDescriptionText = document.querySelector('.profile__description-text');
const insertedName = document.querySelector('.popup__input_text_person-name');
const insertedDescription = document.querySelector('.popup__input_text_description-of-person');
const likeButtton = document.querySelector('.place-card__like-button'); //**************************************** */
const addPhotoPopup = document.querySelector('.popup-new-place');
const popupImagecloseButton = addPhotoPopup.querySelector('.popup-new-place__close-button');// закрыть попап добавления карточки
const imageEditButton = document.querySelector('.profile__add-button');//кнопка открытия попапа добавления карточки
const addNewCardButton = document.querySelector('.popup-new-place__add-button');//кнопка одобавления карточки в попапе
const cardsGrid = document.querySelector('.places-grid');// контейнер для карточек






//закрыть попап
function closeEditProfilePopup() {
    popup.classList.toggle('popup_opened');
    transferTextFromHeader();
}
//открыть попап
function openPopup() {
    popup.classList.toggle('popup_opened');
}
//открыть попап добавления  картинки
function openAddPhotoPopup() {
    addPhotoPopup.classList.toggle('popup_opened');
}
//закрыть попап добавления картинки
function closeAddPhotoPopup() {
    addPhotoPopup.classList.toggle('popup_opened');
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
//кнопка закрыть попап добавления картинки
popupImagecloseButton.addEventListener('click', closeAddPhotoPopup);
//кнопка открыть попап 
profileEditButton.addEventListener('click', openPopup);
//кнопка открыть попап добавления картинки
imageEditButton.addEventListener('click', openAddPhotoPopup);
//кнопка сохранить в попапе
popupSaveButton.addEventListener('click', transferTextFromPopup);
//кнопка лайк
//likeButtton.addEventListener('click', like); // Сырое - не работает!


//функция добавления карточки
function addCard(cardName, imageUrl) {
    const cardTemplate = document.querySelector('#card-template').content; // получаем контент из заготовки  в DOM
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);  // клонируем содержимое дива из заготовки

    card.querySelector('.place-card__desctiption-text').textContent = cardName;
    card.querySelector('.place-card__image').textContent = imageUrl;

    cardsGrid.prepend(card); //вставили карточк в начало

}

addNewCardButton.addEventListener('submit', function () {
    
    const cardName = document.querySelector('.popup-new-place_text_place-name');
    const imageUrl = document.querySelector('.popup__input popup-new-place_text_place-img-url');

    addCard(cardName.value, imageUrl.value);

    cardName.value = '';
    imageUrl.value = '';
    closeAddPhotoPopup();
    
});

