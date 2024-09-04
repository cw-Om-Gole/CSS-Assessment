const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const checkbox = document.querySelector('#checkbox');
const form = document.querySelector("#form");
const generalRadio = document.querySelector("#general");
const supportRadio = document.querySelector("#support");
const consent = document.querySelector("#consent");

const isEmpty = (formInputValue) => formInputValue === "" ? true : false;

const isValidEmail = (email)  => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const displayError = (element, errMsg) => {
    const errorParagraph = element.nextElementSibling;
    errorParagraph.classList.remove("none");
    errorParagraph.classList.add("error");
    errorParagraph.textContent = errMsg; 
    element.classList.add("error-border");
    
}

const displayRadioError = (element, errMsg) => {
    const errorParagraph = element.parentElement.parentElement.nextElementSibling;
    errorParagraph.classList.remove("none");
    errorParagraph.classList.add("error");
    errorParagraph.textContent = errMsg;
    element.classList.add("error-border");
}

const displayCheckBoxError = (element, errMsg) => {
    const errorParagraph = element.parentElement.nextElementSibling;
    errorParagraph.classList.remove("none");
    errorParagraph.classList.add("error");
    errorParagraph.textContent = errMsg;
}

const removeError = (element) => {
    const errorParagraph = element.nextElementSibling;
    element.classList.remove("error-border");
    errorParagraph.classList.add("none");
    errorParagraph.classList.remove("error");
    errorParagraph.textContent = "";
}

const removeRadioError = (element) => {
    const errorParagraph = element.parentElement.parentElement.nextElementSibling;
    errorParagraph.classList.add("none");
    errorParagraph.classList.remove("error");
    errorParagraph.textContent = "";
    element.classList.remove("error-border");
}

const removeCheckBoxError = (element) => {
    const errorParagraph = element.parentElement.nextElementSibling;
    errorParagraph.classList.add("none");
    errorParagraph.classList.remove("error");
    errorParagraph.textContent = "";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    if(isEmpty(firstName.value)) {
        isValid= false;
        displayError(firstName, "This field is required");
    } else {
        removeError(firstName);
    }
    
    if(isEmpty(lastName.value)) {
        isValid= false;
        displayError(lastName, "This field is required");
    } else {
        removeError(lastName);
    }


    if(isEmpty(email.value)) {
        isValid= false;
        displayError(email, "This field is required");
    }  else if(!isValidEmail(email.value)) {
        isValid= false;
        displayError(email, "Please enter a valid email address");
    } else {
        removeError(email);
    }
    
    if(!generalRadio.checked && !supportRadio.checked) {
        isValid= false;
        displayRadioError(supportRadio, "Please Select a query type");
    } else {
        removeRadioError(generalRadio);
    }
    
    
    if(isEmpty(message.value)) {
        isValid= false;
        displayError(message, "This field is required");
    } else {
        removeError(message);
    }

    if(!consent.checked) {
        isValid= false;
        displayCheckBoxError(consent, "To submit this form, please consent to be contacted");
    } else {
        removeCheckBoxError(consent);
    }


        if(isValid) {
            const formElements = document.querySelectorAll('input, textarea, button');
            
            // Disable all form elements
            formElements.forEach(element => {
                element.disabled = true;
                element.value = "";
            });

            generalRadio.checked = false;
            supportRadio.checked = false;

            consent.checked = false;
            
            const toast = document.getElementById('toast');
            toast.classList.add('toast');
            toast.classList.remove('none');
            
            // Hide the toast after 4 seconds
            setTimeout(function() {
                toast.classList.add('none');
                toast.classList.remove('toast');

                
            }, 3000);
        
        }
    });

