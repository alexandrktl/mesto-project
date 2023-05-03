//основной скрипт
const popup = document.querySelector('.popup');//попап общий
const popups = document.querySelectorAll('.popup');//все попапы 
const addPhotoPopup = document.querySelector('.popup_type-new-place');//попап создания новой карточки
const bigImgPopup = document.querySelector('.popup_type-big-image');//попап большой картинки
const editProfilePopup = document.querySelector('.popup_type-edit-profile');//попап редактирования имени профиля
const popupContainer = document.querySelector('.popup__container');//контейнер попапа

const popupProfileForms = document.querySelectorAll('.popup__profile-form');//формы-часть попапа для навешивания сабмита

const cardsGrid = document.querySelector('.places-grid');// контейнер для карточек
const editProfileForm = document.querySelector('#editProfileForm'); //форма у попапа редактирования профиля
const addCardForm = document.querySelector('#addCardForm'); //форма у попапа добавления картинки

const nameOfImgText = document.querySelector('.popup_text-new-place-img-name');
const urlOfCardText = document.querySelector('.popup_text-new-place-img-url');
const mainImg = document.querySelector('.popup__main-photo');//нашли большую картинку
const bigImgTxt = document.querySelector('.popup_text-big-image');

const profileEditButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const popupCloseButtons = document.querySelectorAll('.popup__close-button');//все кнопки закрыть попап 
const popupSaveButton = document.querySelector('.popup__save-button')//кнопка сохранить в попапе редактирования пофиля
const addCardButton = document.querySelector('.profile__add-card-button');//кнопка открытия попапа добавления карточки
const addNewCardButton = document.querySelector('.popup__add-button');//кнопка одобавления карточки в попапе



const insertedName = document.querySelector('.popup__input_text_person-name');//текст-имени в попапе
const insertedDescription = document.querySelector('.popup__input_text_description-of-person');//текст-описаание в попапе
const profileName = document.querySelector('.profile__name-text');//текст-имени в профиле
const profileDescriptionText = document.querySelector('.profile__description-text');//текст-описаание в профиле

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
        name: 'Buhanka',
        link: 'https://cdn.fishki.net/upload/post/2018/02/19/2516245/tn/duptx.jpg'
    },
    {
        name: 'Walksvagen',
        link: 'https://images.unsplash.com/photo-1616421275384-a4871cf679d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
];






//пошла валидация -- прописать стили ошибок в зависимости размера экрана

const showError = (formElement, input, errorMessage) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');

}
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
}
const hideError = (formElement, input) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);




    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


function enableValidation() {
    let formList = Array.from(document.querySelectorAll('.popup__profile-form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList=Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldset)=>{
          setEventListeners(fieldset);
        });
        setEventListeners(formElement); 
    });

}
enableValidation();



























//функция перенос текста из профиля в попап 
function transferTextFromHeader() {
    insertedName.value = (profileName.textContent)
    insertedDescription.value = (profileDescriptionText.textContent);
}

//функция закрыть любой попап 
function closePopup(anyPopup) {
    anyPopup.classList.add('popup_transition');
    anyPopup.classList.remove('popup_opened');
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
}

//кнопка закрыть любой попап
// находим все крестики проекта по универсальному селектору
popupCloseButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
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
    const freshNewCard = addCard(cardName, imageUrl);
    cardsGrid.prepend(freshNewCard); //вставили эту карточкy в начало
    closePopup(addPhotoPopup);
    evt.target.reset();
});

//кнопка открыть попап добавления картинки
addCardButton.addEventListener('click', function () {
    openPopup(addPhotoPopup);
});

//кнопка редактировать профиль 
profileEditButton.addEventListener('click', function () {
    openPopup(editProfilePopup), transferTextFromHeader();
});

//функция добавления карточки
function addCard(nameFromPopup, urlFromPopup) {
    const cardTemplate = document.querySelector('#card-template').content; // получаем контент из заготовки  в DOM
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);  // клонируем содержимое дива из заготовки,
    card.querySelector('.place-card__desctiption-text').textContent = nameFromPopup;// тут меняем текст у картинки
    card.querySelector('.place-card__image').src = urlFromPopup; // тут меняем src у картинки

    //кнопка лайк у карточки
    card.querySelector('.place-card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place-card__like-button_active');
    });

    //кнопка удаления карточки
    card.querySelector('.place-card__trash-button').addEventListener('click', function (evt) {
        const eventTarget = evt.target;                 //опредилили где именно мы нажали на кнопку мусорки
        const closest = eventTarget.closest('.place-card'); // находим ближайшую карточку
        closest.remove();                         //удаляем её
    });

    //нажатие на картинку-открытие попапа БОЛЬШОЙ картинки
    card.querySelector('.place-card__image').addEventListener('click', function (evt) {
        const imgUrl = evt.target.src; // нашли ссылку на именно эту картинку
        openPopup(bigImgPopup);// открыли попап
        mainImg.src = imgUrl;//добавили ей ссылку для отображения
        bigImgTxt.textContent = card.querySelector('.place-card__desctiption-text').textContent;//нашли текст у попапа и заменили его на текст из карточки
        mainImg.alt = (`${bigImgTxt.textContent}` + ' big image');  // альт из текста!
    });

    return card;
}


document.addEventListener('DOMContentLoaded', () => {
    for (let i = initialCards.length - 1; i >= 0; i--) {
        const freshNewCard = addCard(initialCards[i].name, initialCards[i].link);// тут создали карточку
        cardsGrid.prepend(freshNewCard); //вставили эту карточкy в начало
        closePopup(addPhotoPopup);
    }
});
























































