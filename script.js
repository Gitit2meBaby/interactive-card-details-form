const cardNumber = document.querySelector('#number').value.replace(/\s/g, '');
const cardNumberField = document.querySelector('#number')
const cardNumberDisplay = document.querySelector('#cardNumberDisplay');
const cvc = document.querySelector('#cvc').value;
const cvcField = document.querySelector('#cvc');
const cvcDisplay = document.querySelector('#cvcDisplay');
const name = document.querySelector('#name').value;
const nameField = document.querySelector('#name');
const nameDisplay = document.querySelector('#nameDisplay');
const month = document.querySelector('#month').value;
const monthField = document.querySelector('#month');
const year = document.querySelector('#year').value;
const yearField = document.querySelector('#year');
const expiryDisplay = document.querySelector('#expiryDisplay');
const formContainer = document.querySelector(".form-container")

function cardValidation() {
    console.log('Card Number:', cardNumber);

    // Validate card number using Luhn algorithm
    const cardNoRegex = /^[0-9]{12,19}$/;
    if (!cardNoRegex.test(cardNumber)) {

        const numberDiv = document.querySelector('.card-number')
        const errorMsg = document.createElement('p')
        errorMsg.textContent = 'Wrong format, numbers only';
        errorMsg.classList.add('invalid')
        numberDiv.appendChild(errorMsg)
        cardNumberField.classList.add('invalid-input')

        cardNumberField.addEventListener('focus', function () {
            errorMsg.remove();
            cardNumberField.classList.remove('invalid-input');
        });

        return false;
    }

    console.log('Card Number passes regex check.');

    const checkDigit = parseInt(cardNumber.charAt(cardNumber.length - 1));
    const sum = cardNumber
        .slice(0, -1)
        .split('')
        .reverse()
        .map((digit, index) => {
            const num = parseInt(digit);
            return index % 2 !== 0 ? num : num * 2; // Change index condition to double every second digit
        })
        .map((digit) => (digit > 9 ? digit - 9 : digit))
        .reduce((acc, digit) => acc + digit, checkDigit);


    console.log('Sum:', sum);

    if (sum % 10 !== 0) {
        alert('Please enter a valid card number');
        return false;
    }

    console.log('Card Number is valid.');

    // check if month and year are blank
    if (month === '' || year === '') {
        const expiryInputs = document.querySelector('.expiry')
        const errorMsg = document.createElement('p')
        errorMsg.textContent = "Can't be blank";
        errorMsg.classList.add('invalid')
        expiryInputs.appendChild(errorMsg);
        monthField.classList.add('invalid-input')

        monthField.addEventListener('focus', function () {
            errorMsg.remove();
            monthField.classList.remove('invalid-input');
        });

        return false;
    }

    //check if cvc is blank
    if (cvc === '') {
        const cvcInputs = document.querySelector('.cvc-input-section')
        const errorMsg = document.createElement('p')
        errorMsg.textContent = "Can't be blank";
        errorMsg.classList.add('invalid')
        cvcInputs.appendChild(errorMsg);
        cvcField.classList.add('invalid-input')

        cvcField.addEventListener('focus', function () {
            errorMsg.remove();
            cvcField.classList.remove('invalid-input');
        });

        return false;
    }


    // Update card details on display
    cardNumberDisplay.textContent = cardNumber.replace(/(\d{4})/g, '$1 ').trim();
    cvcDisplay.textContent = cvc;
    nameDisplay.textContent = name;
    expiryDisplay.textContent = `${month}/${year}`;

    // Show completed state
    const completeState = document.querySelector('.complete-state');
    completeState.classList.remove('hidden');
    formContainer.classList.add('hidden')
}

//update text in real time
cardNumberField.addEventListener('keyup', function () {
    cardNumberDisplay.textContent = cardNumberField.value;
});
nameField.addEventListener('keyup', function () {
    nameDisplay.textContent = nameField.value;
});
cvcField.addEventListener('keyup', function () {
    cvcDisplay.textContent = cvcField.value;
});
monthField.addEventListener('keyup', function () {
    expiryDisplay.textContent = monthField.value;
});
yearField.addEventListener('keyup', function () {
    expiryDisplay.textContent = `${monthField.value}/${yearField.value}`;
});