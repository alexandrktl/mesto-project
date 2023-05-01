//console.log('я скрипт валидации');

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
//проверки и кастомные сообщения
const checkInputValidity = (formElement, inputElement) => {
    const regex = /[^а-я0-9\-\s\w\ё]/gi;
    // const regexOneElem = /.{1,1}/gi;
    if (regex.test(inputElement.value) && inputElement.type !== 'url') {//если попадает под регулярку и не является ссылкой
        inputElement.setCustomValidity('оба поля могут содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы');
        showError(formElement, inputElement, inputElement.validationMessage);
    } else if (inputElement.validity.valid === false) {
        //console.log('lol');
        inputElement.setCustomValidity('');
        showError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideError(formElement, inputElement);
        inputElement.setCustomValidity('');
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
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset);
        });
        setEventListeners(formElement);
    });

}
export{enableValidation}
