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
    popup.classList.add('popup_transition');
    popup.classList.toggle('popup_opened');
    transferTextFromHeader();
}
//закрыть попап большой картинки
function closeBigImgPopup() {
    bigImgPopup.classList.add('popup_transition');
    bigImgPopup.classList.toggle('popup_opened');
}
//закрыть попап добавления картинки
function closeAddPhotoPopup() {
    addPhotoPopup.classList.add('popup_transition');
    addPhotoPopup.classList.toggle('popup_opened');
    document.querySelector('.popup-new-place_text_place-name').value = ''; // очищаем поле ввода
    imageUrl = document.querySelector('.popup-new-place_text_place-img-url').value = ''; // очищаем поле ввода
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
    //нажатие на картинку-открытие попапа БОЛЬШОЙ картинки
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

const initialCards = [
    {
      name: 'Mercedes',
      link: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
    },
    {
      name: 'Audi',
      link: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Ferrari ',
      link: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'BMW',
      link: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
    },
    {
      name: 'Bugatti',
      link: 'https://images.unsplash.com/photo-1584902645120-f86567d892b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80'
    },
    {
      name: 'Walksvagen',
      link: 'https://images.unsplash.com/photo-1616421275384-a4871cf679d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
  ]; 


  document.addEventListener('DOMContentLoaded', () => {
    for (let i=initialCards.length-1;i>=0;i--){
        addCard(initialCards[i].name , initialCards[i].link);
    }
});



