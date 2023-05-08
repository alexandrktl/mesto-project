import { profileName } from "./modal";
import { deletCardFrServ, putLike, removeLike } from "./api";


//функционал только создание одной карточки!
const cardsGrid = document.querySelector('.places-grid');// контейнер для карточек
const bigImgPopup = document.querySelector('.popup_type-big-image');//попап большой картинки
const mainImg = document.querySelector('.popup__main-photo');//нашли большую картинку
const bigImgText = document.querySelector('.popup_text-big-image');


import { openPopup } from "./modal";


// тут создаем карточку и возвращаете ее
function insertCard(card) {
    cardsGrid.prepend(card); //вставили карточкy в начало
    return card;
}

//функция добавления карточки
function addCard(nameFromPopup, urlFromPopup, likes, owner, id) {
    const cardTemplate = document.querySelector('#card-template').content; // получаем контент из заготовки  в DOM
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);  // клонируем содержимое дива из заготовки,
    card.querySelector('.place-card__desctiption-text').textContent = nameFromPopup;// тут меняем текст у картинки
    card.querySelector('.place-card__image').src = urlFromPopup; // тут меняем src у картинки
    card.querySelector('.place-card__image').alt = `${nameFromPopup}-photo`; //прописываем альт
    const rubishIcon = card.querySelector('.place-card__trash-button');
    card.id = id;
    const likesCount = likes.length;
    //console.log(likes);

    //количество лайков у карточки
    card.querySelector('.place-card__like-number').textContent = likesCount;




    //кнопка лайк у карточки
    card.querySelector('.place-card__like-button').addEventListener('click', function (evt) {
        //возможно ошибка с цифрами лайков
        if (!evt.target.classList.contains('place-card__like-button_active')) {
            putLike(id);
            evt.target.classList.add('place-card__like-button_active');
            card.querySelector('.place-card__like-number').textContent = likesCount + 1;
        }else{
           // console.log('likes');
           removeLike(id);
            evt.target.classList.remove('place-card__like-button_active');
            card.querySelector('.place-card__like-number').textContent = likesCount ;
        }
    });





    //кнопка удаления карточки
    rubishIcon.addEventListener('click', function (evt) {
        const eventTarget = evt.target;                 //опредилили где именно мы нажали на кнопку мусорки
        const parentElement = eventTarget.closest('.place-card') // находим ближайший элемент
        deletCardFrServ(parentElement.id);          //удаляем родителя с сервера
        parentElement.remove();                         //удаляем родителя из разметки
    });

    //нажатие на картинку-открытие попапа БОЛЬШОЙ картинки
    card.querySelector('.place-card__image').addEventListener('click', function (evt) {
        const imgUrl = evt.target.src; // нашли ссылку на именно эту картинку
        openPopup(bigImgPopup);
        mainImg.src = imgUrl;//добавили ей ссылку для отображения
        bigImgText.textContent = card.querySelector('.place-card__desctiption-text').textContent;//нашли текст у попапа и заменили его на текст из карточки
        mainImg.alt = `${bigImgText.textContent}-big-photo`
    });

    //сделаем проверку-если овнер=имя аккаунта, то класс мусорки-актив
    if (owner == profileName.textContent) {
        rubishIcon.classList.add('place-card__trash-button_active');
    };

    insertCard(card);

}

export { addCard };



