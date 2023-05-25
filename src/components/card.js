import { profileName } from "./modal";
import { deletCardFrServ, putLike, removeLike, getUserInfo } from "./api";


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
function addCard(nameFromPopup, urlFromPopup, likes, owner_id, id, ownerId) {

    const cardTemplate = document.querySelector('#card-template').content; // получаем контент из заготовки  в DOM
    const card = cardTemplate.querySelector('.place-card').cloneNode(true);  // клонируем содержимое дива из заготовки,
    card.querySelector('.place-card__desctiption-text').textContent = nameFromPopup;// тут меняем текст у картинки
    card.querySelector('.place-card__image').src = urlFromPopup; // тут меняем src у картинки
    card.querySelector('.place-card__image').alt = `${nameFromPopup}-photo`; //прописываем альт
    const rubishIcon = card.querySelector('.place-card__trash-button');
    card.id = id;
    const likesCount = likes.length;
    const likeBtn = card.querySelector('.place-card__like-button');
    const likeCount = card.querySelector('.place-card__like-number');
    //console.log(likes);
    likeCount.textContent = likesCount;
    likes.forEach(element => {
        if (element._id === ownerId) {
            likeBtn.classList.add('place-card__like-button_active');
        }
    });

    //кнопка лайк у карточки
    likeBtn.addEventListener('click', function (evt) {

        if (!evt.target.classList.contains('place-card__like-button_active')) {
            putLike(id)
                .then(() => {
                    evt.target.classList.add('place-card__like-button_active');
                    likeCount.textContent = likesCount + 1;
                })
                .catch((reject) => {
                    console.error(`failed fetch. Code error:${reject}`)
                });

        } else {
            removeLike(id)
                .then(() => {
                    evt.target.classList.remove('place-card__like-button_active');
                    likeCount.textContent = likeCount.textContent - 1;
                })
                .catch((reject) => {
                    console.error(`failed fetch. Code error:${reject}`)
                });
        }
    });





    //кнопка удаления карточки
    rubishIcon.addEventListener('click', function (evt) {
        const eventTarget = evt.target;                 //опредилили где именно мы нажали на кнопку мусорки
        const parentElement = eventTarget.closest('.place-card') // находим ближайший элемент
        deletCardFrServ(parentElement.id)
            .then(() => {
                parentElement.remove();                         //удаляем родителя из разметки
            })          //удаляем родителя с сервера
            .catch((reject) => {
                console.error(`failed fetch. Code error:${reject}`)
            })
    });

    //нажатие на картинку-открытие попапа БОЛЬШОЙ картинки
    card.querySelector('.place-card__image').addEventListener('click', function (evt) {
        const imgUrl = evt.target.src; // нашли ссылку на именно эту картинку
        openPopup(bigImgPopup);
        mainImg.src = imgUrl;//добавили ей ссылку для отображения
        bigImgText.textContent = card.querySelector('.place-card__desctiption-text').textContent;//нашли текст у попапа и заменили его на текст из карточки
        mainImg.alt = `${bigImgText.textContent}-big-photo`
    });


    //дать res = null || что-то, и если он не равен ничего, то проведи проверкуниже на состояние мусорки, иначе она активна



    if (owner_id == ownerId) {
        rubishIcon.classList.add('place-card__trash-button_active');
    };
    insertCard(card);



}

export { addCard };




