//все что есть в модальных окнах-попапах
import { addCard } from "./card";



const editProfilePopup = document.querySelector('.popup_type-edit-profile');//попап редактирования имени профиля
const popupCloseButtons = document.querySelectorAll('.popup__close-button');//все кнопки закрыть попап 
const popups = document.querySelectorAll('.popup');//все попапы 
const addCardButton = document.querySelector('.profile__add-card-button');//кнопка открытия попапа добавления карточки
const addPhotoPopup = document.querySelector('.popup_type-new-place');//попап создания новой карточки
const editProfileForm = document.querySelector('#editProfileForm'); //форма у попапа редактирования профиля
const addCardForm = document.querySelector('#addCardForm'); //форма у попапа добавления картинки
const nameOfImgText = document.querySelector('.popup_text-new-place-img-name');
const urlOfCardText = document.querySelector('.popup_text-new-place-img-url');
const profileEditButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const insertedName = document.querySelector('.popup__input_text_person-name');//текст-имени в попапе
const insertedDescription = document.querySelector('.popup__input_text_description-of-person');//текст-описаание в попапе
const profileName = document.querySelector('.profile__name-text');//текст-имени в профиле
const profileDescriptionText = document.querySelector('.profile__description-text');//текст-описаание в профиле


//функция перенос текста из профиля в попап 
function transferTextFromHeader() {
    insertedName.value = (profileName.textContent)
    insertedDescription.value = (profileDescriptionText.textContent);
}

//функция закрыть любой попап 
function closePopup(anyPopup) {
    anyPopup.classList.add('popup_transition');
    anyPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);

}


//функция перенос текста из попапа в профиль
function transferTextFromPopup() {
    profileName.textContent = insertedName.value;
    profileDescriptionText.textContent = insertedDescription.value;
    closePopup(editProfilePopup);
}

//функция открыть любой попап
function openPopup(whatToOpen) {
    whatToOpen.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    if(Array.from(whatToOpen.classList).includes('popup_type-big-image')){  // если модалка большой каритнки- не очищай поля
        return;
    }
    const submitButton=whatToOpen.querySelector('.popup__submit-button');//собака зарыта
    submitButton.classList.add('popup__submit-button_inactive');
    const errorSpan=whatToOpen.querySelector('.popup__input-error');//собака зарыта
    errorSpan.textContent='';
    errorSpan.classList.remove('popup__input-error_active')

}

//кнопка закрыть любой попап
// находим все крестики проекта по универсальному селектору
popupCloseButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));


});

//закрыть любой попап ажатием на esc
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened') //нашли открытый попап
        closePopup(openedPopup);
    }
}





//закрыть любой попап нажатием на оверлей и нажатием на esc
popups.forEach((thisPopup) => {
    thisPopup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(thisPopup);
        }
    });
});



//кнопка сохранить в попапе редактирования профиля 
//отменили обновление страницы для всех сабмитов и очистили поля после использования                  
editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    transferTextFromPopup();
    evt.target.reset();
});


//кнопка добавить новую карточку в попаде добавления нов карточки 
//отменили обновление страницы для всех сабмитов и очистили поля после использования                  
addCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardName = nameOfImgText.value;
    const imageUrl = urlOfCardText.value;
    addCard(cardName, imageUrl);
    closePopup(addPhotoPopup);
    evt.target.reset();

});

//кнопка открыть попап добавления картинки
addCardButton.addEventListener('click', function () {
    openPopup(addPhotoPopup);
    // //тут нужно деактивировать кнопку
    // formSubmitButton.classList.add('popup__submit-button_inactive');

});

//кнопка редактировать профиль 
profileEditButton.addEventListener('click', function () {
    openPopup(editProfilePopup), transferTextFromHeader();
});


export { transferTextFromHeader, closePopup, transferTextFromPopup, openPopup, addPhotoPopup }