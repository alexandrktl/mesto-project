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
const popupImagecloseButton = addPhotoPopup.querySelector('.popup-new-place__close-button');// кнопка закрытия попапа добавления карточки
const imageEditButton = document.querySelector('.profile__add-button');//кнопка открытия попапа добавления карточки
const addNewCardButton = document.querySelector('.popup-new-place__add-button');//кнопка одобавления карточки в попапе
const cardsGrid = document.querySelector('.places-grid');// контейнер для карточек
const bigImgPopup = document.querySelector('.popup-big-image');//попап большой картинки
const bigImgPopupCloseButton = bigImgPopup.querySelector('.popup-big-image__close-button'); // кнопка закрытия попапа большой картинки




//закрыть попап
function closeEditProfilePopup() {
    popup.classList.toggle('popup_opened');
    transferTextFromHeader();
}
//открыть попап
function openPopup() {
    popup.classList.toggle('popup_opened');
    transferTextFromHeader();
}
//открыть попап добавления  картинки
function openAddPhotoPopup() {
    addPhotoPopup.classList.toggle('popup_opened');
}
//закрыть попап добавления картинки
function closeAddPhotoPopup() {
    addPhotoPopup.classList.toggle('popup_opened');
    document.querySelector('.popup-new-place_text_place-name').value = ''; // очищаем поле ввода
    imageUrl = document.querySelector('.popup-new-place_text_place-img-url').value = ''; // очищаем поле ввода
}

//перенос текста из профиля в попап
function transferTextFromHeader() {
    insertedName.value = (profileName.textContent)
    insertedDescription.value = (profileDescriptionText.textContent)
}


//перенос текста из попапа в профиль
function transferTextFromPopup(evt) {
    evt.preventDefault()
    profileName.textContent = insertedName.value
    profileDescriptionText.textContent = insertedDescription.value
    closeEditProfilePopup()

}
//закрыть попап большой картинки
function closeBigImgPopup() {
     bigImgPopup.classList.toggle('popup_opened');

    // setTimeout(function(){
    //     bigImgPopup.classList.toggle('popup-big-image_opened');
    //   }, 500);
}

//кнопка закрыть попап
popupCloseButton.addEventListener('click', closeEditProfilePopup);
//кнопка закрыть попап добавления картинки
popupImagecloseButton.addEventListener('click', closeAddPhotoPopup);
//кнопка закрыть попап большой картинки
bigImgPopupCloseButton.addEventListener('click', closeBigImgPopup);
//кнопка открыть попап 
profileEditButton.addEventListener('click', openPopup);
//кнопка открыть попап добавления картинки
imageEditButton.addEventListener('click', openAddPhotoPopup);
//кнопка сохранить в попапе
popupSaveButton.addEventListener('click', transferTextFromPopup);




//функция добавления карточки
function addCard(nameFromPopup, urlFromPopup) {
    const cardTemplate = document.querySelector('#card-template').content; // получаем контент из заготовки  в DOM
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);  // клонируем содержимое дива из заготовки
    card.querySelector('.place-card__desctiption-text').textContent = nameFromPopup;
    card.querySelector('.place-card__image').src = urlFromPopup; // тут меняем src у картинки

    //кнопка лайк
    card.querySelector('.place-card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place-card__like-button_active');
    })

    //кнопка удаления карточки
    card.querySelector('.place-card__trash-button').addEventListener('click', function (evt) {
        const eventTarget = evt.target;                 //опредилили где именно мы нажали на кнопку мусорки
        const parentElement = eventTarget.parentElement // находим родительский элемент
        parentElement.remove();                         //удаляем родителя 
    })
    //нажатие на рактинку-открытие попапа БОЛЬШОЙ картинки
    card.querySelector('.place-card__image').addEventListener('click', function (evt) {
        const imgUrl = evt.target.src; // нашли ссылку на именно эту картинку
        document.querySelector('.popup-big-image').classList.toggle('popup_opened');//нашли и переключили класс для активации попапа
        const mainImg = document.querySelector('.popup-big-image__main-image');//нашли большую картинку
        mainImg.src = imgUrl;//добавили ей ссылку для отображения
        document.querySelector('.popup-big-image__text').textContent = card.querySelector('.place-card__desctiption-text').textContent;//нашли текст у попапа и заменили его на текст из карточки

    })
    cardsGrid.prepend(card); //вставили карточк в начало
    closeAddPhotoPopup();
}

document.querySelector('.popup-new-place__profile-form').addEventListener('submit', function (evt) { // вешаем на форму, потомучто ХЗ, сабмиту только так
    evt.preventDefault();
    const cardName = document.querySelector('.popup-new-place_text_place-name').value;
    const imageUrl = document.querySelector('.popup-new-place_text_place-img-url').value;
    addCard(cardName, imageUrl);
}
);


