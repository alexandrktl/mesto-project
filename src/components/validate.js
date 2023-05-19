//console.log('я скрипт валидации');

const showError = (formElement, input, errorMessage,setting) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
   // input.classList.add('popup__input_type_error'); 
    input.classList.add(setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);

}
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
const toggleButtonState = (inputList, buttonElement,setting) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(setting.inactiveButtonClass);
        buttonElement.disabled = true;
        buttonElement.value = 'Disabled';
        
    } else {
        buttonElement.classList.remove(setting.inactiveButtonClass);
        buttonElement.disabled = false;
        buttonElement.value = 'Enabled';
    }
}
const hideError = (formElement, input,setting) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = "";
}
//проверки и кастомные сообщения
const checkInputValidity = (formElement, inputElement,setting) => {
    inputElement.dataset.inputError='оба поля могут содержать только латинские буквы, кириллические буквы, знаки дефиса и пробелы';
    const regex = /[^а-яa-z\_\-\s\ё]/gi;
    if (regex.test(inputElement.value) && inputElement.type !== 'url') {//если попадает под регулярку и не является ссылкой
        inputElement.setCustomValidity(inputElement.dataset.inputError);
        showError(formElement, inputElement, inputElement.validationMessage,setting);
    } else if (inputElement.validity.valid === false) {
        inputElement.setCustomValidity('');
        showError(formElement, inputElement, inputElement.validationMessage,setting);
    }
    else {
        hideError(formElement, inputElement,setting);
        inputElement.setCustomValidity('');
    }
};


const setEventListeners = (formElement,setting) => {
    
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    toggleButtonState(inputList, buttonElement,setting);




    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement,setting);
            toggleButtonState(inputList, buttonElement,setting);
        });
    });
};


function enableValidation(setting) {
    const formList = Array.from(document.querySelectorAll(setting.popupFormSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(setting.formSet));

        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset,setting);
        });
        setEventListeners(formElement,setting);
    });

}

export{enableValidation,toggleButtonState}
