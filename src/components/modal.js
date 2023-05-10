//все что есть в модальных окнах-попапах
import { addCard } from "./card";import { getUserInfo, refreshUserInfo, postCardToServer, getCards, changeAvatarOnServer } from "./api";




const editProfilePopup = document.querySelector('.popup_type-edit-profile');//попап редактирования имени профиля
const popupCloseButtons = document.querySelectorAll('.popup__close-button');//все кнопки закрыть попап 
const popups = document.querySelectorAll('.popup');//все попапы 
const addCardButton = document.querySelector('.profile__add-card-button');//кнопка открытия попапа добавления карточки
const addPhotoPopup = document.querySelector('.popup_type-new-place');//попап создания новой карточки
const changeAvatarPopup = document.querySelector('.popup_type-change-avatar');//попап изменения аватара
const editProfileForm = document.querySelector('#editProfileForm'); //форма у попапа редактирования профиля
const changeAvatarForm = document.querySelector('#changeAvatarForm'); //форма у попапа редактирования аватара
const addCardForm = document.querySelector('#addCardForm'); //форма у попапа добавления картинки
const nameOfImgText = document.querySelector('.popup_text-new-place-img-name');
const urlOfCardText = document.querySelector('.popup_text-new-place-img-url');
const profileEditButton = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const changeAvatarButton = document.querySelector('.profile__avatar');//кнопка редактирования аватара
const insertedName = document.querySelector('.popup__input_text_person-name');//текст-имени в попапе
const insertedAvatar = document.querySelector('.popup__input_text_new-avatar-url');//текст-новой ссылки логотипа в попапе
const insertedDescription = document.querySelector('.popup__input_text_description-of-person');//текст-описаание в попапе
const profileName = document.querySelector('.profile__name-text');//текст-имени в профиле
const profileDescriptionText = document.querySelector('.profile__description-text');//текст-описаание в профиле
const profileAvatar = document.querySelector('.profile__avatar');//аватарка профиля


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

//функция перенос имени и описания с сервева
function getNameFromServer() {
    getUserInfo() //вставили новые данные из сервера
        .then((res) => {
            //console.log(res);
            profileName.textContent = res.name;
            profileDescriptionText.textContent = res.about;
            profileAvatar.src = res.avatar;
        });
}

//функция перенос текста из попапа в профиль
function transferTextFromPopup(submitBtn) {
    submitBtn.textContent = 'Сохранение...';
    const newName = insertedName.value;//передали значения полей в переменные
    const NewDiscription = insertedDescription.value;

    const mod = {
        newName: `${newName}`,//отдали эти переменные
        newAbout: `${NewDiscription}`,
        contentType: 'application/json',
    }
    refreshUserInfo(mod)
        .then(() => {
            getUserInfo()
                .then((res) => {
                    profileName.textContent = res.name;
                    profileDescriptionText.textContent = res.about;
                })
            submitBtn.textContent = 'Сохранить';
            closePopup(editProfilePopup);
        })



}



//кнопка сохранить в попапе редактирования профиля 
//отменили обновление страницы для всех сабмитов и очистили поля после использования                  
editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const submitBtn = editProfileForm.querySelector('.popup__submit-button');
    transferTextFromPopup(submitBtn);

    evt.target.reset();
});

























//кнопка сохранить в попапе редактирования аватара                  
changeAvatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const submitBtn = changeAvatarForm.querySelector('.popup__submit-button');
    submitBtn.textContent = 'Сохранение...';
    const newUrl = insertedAvatar.value;

    const mod = {
        newUrl: `${newUrl}`,//отдали эти переменные
        contentType: 'application/json',
    }
    changeAvatarOnServer(mod)
        .then(() => {
            getUserInfo() //вставили новые данные из сервера
                .then((res) => {
                    // console.log(res);
                    profileAvatar.src = res.avatar;
                    closePopup(changeAvatarPopup);
                    submitBtn.textContent = 'Сохранить';
                    insertedAvatar.value = '';
                })
        });
})

//кнопка добавить новую карточку в попаде добавления нов карточки 
//отменили обновление страницы для всех сабмитов и очистили поля после использования                  
addCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const submitBtn = addCardForm.querySelector('.popup__submit-button');
    submitBtn.textContent = 'Сохранение...';
    const cardName = nameOfImgText.value;
    const imageUrl = urlOfCardText.value;
    //тут нужно послать данные на сервер
    const mod = {
        name: `${cardName}`,    //отдали эти переменные
        link: `${imageUrl}`,
        contentType: 'application/json',  // тут нужно что-то другое
    }
    postCardToServer(mod)//обновили данные сервера на переменные выше
        .then(() => {
            getCards()
                .then((cards) => {
                    const newCardFromServer = cards[0];
                    addCard(newCardFromServer.name, newCardFromServer.link, newCardFromServer.likes, newCardFromServer.owner.name, newCardFromServer._id)

                })
            closePopup(addPhotoPopup);
            submitBtn.textContent = 'Сохранить';
        })


    evt.target.reset();

});







































//функция открыть любой попап
function openPopup(whatToOpen) {
    whatToOpen.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);

    }
    
    if (Array.from(whatToOpen.classList).includes('popup_type-big-image')) {  // если модалка большой каритнки- не очищай поля
        return;
    }
    const submitButton = whatToOpen.querySelector('.popup__submit-button');//собака зарыта
    submitButton.classList.add('popup__submit-button_inactive');
    const errorSpan = whatToOpen.querySelector('.popup__input-error');//собака зарыта
    errorSpan.textContent = '';
    errorSpan.classList.remove('popup__input-error_active')



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







//кнопка открыть попап добавления картинки
addCardButton.addEventListener('click', function () {
    openPopup(addPhotoPopup);
     //тут нужно деактивировать кнопку
     cleanAll(addPhotoPopup);
});
//кнопка редактировать профиль 
profileEditButton.addEventListener('click', function () {
    openPopup(editProfilePopup), transferTextFromHeader();
    //тут нужно деактивировать кнопку
    cleanAll(editProfilePopup);
});
//кнопка редактировать аватар
changeAvatarButton.addEventListener('click', function () {
    openPopup(changeAvatarPopup);
});

//собрать обе кнопки и навешать обои  событие очистки
//написать функцию которая деактивирует и кнопку и спан и вызывать эту функцию при кликах на сабмиты модалок
function cleanAll(popup) {
    const submitButton = popup.querySelector('.popup__submit-button');//собака зарыта
    submitButton.classList.add('popup__submit-button_inactive');
    submitButton.disabled = true;
    submitButton.value = 'Disabled';
    const errorSpan = popup.querySelector('.popup__input-error');//собака зарыта
    errorSpan.textContent = '';
    errorSpan.classList.remove('popup__input-error_active')
}






// getUserInfo()
//     .then((res) => {
//         // console.log(res);
//         profileName.textContent = res.name;
//         profileDescriptionText.textContent = res.about;
//     });





















export { transferTextFromHeader, closePopup, transferTextFromPopup, openPopup, addPhotoPopup, getNameFromServer, profileName }