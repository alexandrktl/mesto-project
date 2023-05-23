import './pages/index.css'; // добавьте импорт главного файла стилей 
import { addCard } from './components/card';
import { enableValidation } from './components/validate';
import { getCards } from './components/api';
import { getNameFromServer } from './components/modal';

const setting = {
    inputErrorClass: 'popup__input_type_error',
    popupFormSelector: '.popup__profile-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    errorClass: 'popup__input-error_active',
    inactiveButtonClass: 'popup__submit-button_inactive',
}

Promise.all([getCards(), getNameFromServer(), enableValidation(setting)])
    .then(([cards]) => {
        cards.reverse().forEach(card => {
            addCard(card.name, card.link, card.likes, card.owner._id, card._id)
        });
    }).catch((reject) => {
        console.error(`failed fetch. Code error:${reject}`)
    })









