const noAnswerOption = document.getElementById('no-answer-option');
const paymentTakenOption = document.getElementById('payment-taken-option');
const paymentDetails = document.getElementById('payment-details');
const amountInputsContainer = document.getElementById('amount-inputs-container');
const statusOptionsContainer = document.querySelector('.status-options');
const actionPickerContainer = document.querySelector('.action-picker-container');
const actionLabel = document.getElementById('action-label');
const actionSelection = document.getElementById('action-selection');
const actionOptions = document.getElementById('action-options');
const callerTypeWrapper = document.getElementById('caller-type-wrapper');
const callerTypeOptions = document.querySelector('.caller-type-options');
const callReasonLabel = document.getElementById('call-reason-label');
const callReasonSelection = document.getElementById('call-reason-selection');
const callReasonOptions = document.getElementById('call-reason-options');
const addBankOption = document.getElementById('add-bank-option');
const addCardOption = document.getElementById('add-card-option');
const lastFourInput = document.getElementById('last-four-input');
const hardshipOption = document.getElementById('hardship-option');
const arrangementOption = document.getElementById('arrangement-option');
const arrangementDetails = document.getElementById('arrangement-details');
const arrangementRowsContainer = document.getElementById('arrangement-rows-container');
const emailOption = document.getElementById('email-option');
const emailInput = document.getElementById('email-input');
const atpOption = document.getElementById('atp-option');
const atpSubOptions = document.getElementById('atp-sub-options');
const npdOption = document.getElementById('npd-option');
const npdDateDisplay = document.getElementById('npd-date-display');
const npdDateInput = document.getElementById('npd-date-input');
const ssoOption = document.getElementById('sso-option');
const mainTextArea = document.querySelector('.text-area');
const hardshipMenuButton = document.getElementById('hardship-menu-button');
const notepadMenuButton = document.getElementById('notepad-menu-button');


function toggleOption(optionElement) {
    let text = optionElement.textContent;
    if (text.endsWith('*')) {
        optionElement.textContent = text.slice(0, -1);
    } else {
        optionElement.textContent = text + '*';
    }
}

function createAmountRow() {
    const row = document.createElement('div');
    row.className = 'amount-row';
    const button = document.createElement('span');
    button.className = 'action-button';
    button.textContent = '+';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'amount-input';
    input.placeholder = '0.00';
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });
    row.appendChild(button);
    row.appendChild(input);
    amountInputsContainer.appendChild(row);
    updateActionButtons(amountInputsContainer, '.amount-row');
}

function createArrangementRow() {
    const row = document.createElement('div');
    row.className = 'arrangement-row';
    const button = document.createElement('span');
    button.className = 'action-button';
    button.textContent = '+';
    const amountInput = document.createElement('input');
    amountInput.type = 'text';
    amountInput.className = 'arrangement-amount';
    amountInput.placeholder = '0.00';
    amountInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'date-input-wrapper';
    const dateDisplay = document.createElement('span');
    dateDisplay.className = 'date-display';
    dateDisplay.textContent = '//';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'arrangement-date-input';
    dateInput.addEventListener('change', () => {
        if (dateInput.value) {
            const [year, month, day] = dateInput.value.split('-');
            dateDisplay.textContent = `${day}/${month}/${year.slice(-2)}`;
        }
    });
    dateWrapper.appendChild(dateDisplay);
    dateWrapper.appendChild(dateInput);
    row.appendChild(button);
    row.appendChild(amountInput);
    row.appendChild(dateWrapper);
    arrangementRowsContainer.appendChild(row);
    updateActionButtons(arrangementRowsContainer, '.arrangement-row');
}

function updateActionButtons(container, rowSelector) {
    const allRows = container.querySelectorAll(rowSelector);
    allRows.forEach((row, index) => {
        const button = row.querySelector('.action-button');
        if (index === allRows.length - 1) {
            button.textContent = '+';
        } else {
            button.textContent = '-';
        }
    });
}

function setStatus(selectedOption) {
    statusOptionsContainer.querySelectorAll('.status-option').forEach(opt => {
        let text = opt.textContent.replace(/[\[\]]/g, '');
        if (opt === selectedOption) {
            opt.textContent = `[${text}]`;
        } else {
            opt.textContent = text;
        }
    });
}

function setCallerType(selectedOption) {
    callerTypeOptions.querySelectorAll('.caller-type-option').forEach(opt => {
        let text = opt.textContent.replace(/[\[\]]/g, '');
        if (opt === selectedOption) {
            opt.textContent = `[${text}]`;
        } else {
            opt.textContent = text;
        }
    });
}

function setAtpType(selectedOption) {
    atpSubOptions.querySelectorAll('.atp-type-option').forEach(opt => {
        let text = opt.textContent.replace(/[\[\]]/g, '');
        if (opt === selectedOption) {
            opt.textContent = `[${text}]`;
        } else {
            opt.textContent = text;
        }
    });
}

mainTextArea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

noAnswerOption.addEventListener('click', function() {
    toggleOption(noAnswerOption);
    const isNoAnswer = noAnswerOption.textContent.endsWith('*');
    actionPickerContainer.classList.toggle('hidden', !isNoAnswer);
    callerTypeWrapper.classList.toggle('hidden', isNoAnswer);
});

paymentTakenOption.addEventListener('click', function() {
    toggleOption(paymentTakenOption);
    const isActive = paymentTakenOption.textContent.endsWith('*');
    paymentDetails.classList.toggle('hidden', !isActive);
    if (isActive && amountInputsContainer.children.length === 0) {
        createAmountRow();
        setStatus(statusOptionsContainer.querySelector('.status-option[data-status="Arrears"]'));
    }
});

arrangementOption.addEventListener('click', function() {
    toggleOption(arrangementOption);
    const isActive = arrangementOption.textContent.endsWith('*');
    arrangementDetails.classList.toggle('hidden', !isActive);
    if (isActive && arrangementRowsContainer.children.length === 0) {
        createArrangementRow();
    }
});

emailOption.addEventListener('click', function() {
    toggleOption(emailOption);
    emailInput.classList.toggle('hidden', !emailOption.textContent.endsWith('*'));
});

atpOption.addEventListener('click', function() {
    toggleOption(atpOption);
    atpSubOptions.classList.toggle('hidden', !atpOption.textContent.endsWith('*'));
});

atpSubOptions.addEventListener('click', function(event) {
    if (event.target.classList.contains('atp-type-option')) {
        setAtpType(event.target);
    }
});

npdDateInput.addEventListener('click', function() {
    toggleOption(npdOption);
    if (!npdOption.textContent.endsWith('*')) {
        npdDateDisplay.textContent = '';
        npdDateInput.value = '';
    }
});

npdDateInput.addEventListener('change', function() {
    if (npdDateInput.value) {
        const [year, month, day] = npdDateInput.value.split('-');
        npdDateDisplay.textContent = `${day}/${month}/${year.slice(-2)}`;
        if (!npdOption.textContent.endsWith('*')) {
             toggleOption(npdOption);
        }
    }
});

ssoOption.addEventListener('click', function() {
    toggleOption(ssoOption);
});

hardshipOption.addEventListener('click', function() {
    toggleOption(hardshipOption);
    const isActive = hardshipOption.textContent.endsWith('*');
    hardshipMenuButton.classList.toggle('hidden', !isActive);
    notepadMenuButton.classList.toggle('hidden', !isActive);
});

amountInputsContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('action-button')) {
        if (target.textContent === '+') {
            createAmountRow();
        } else if (target.textContent === '-') {
            target.closest('.amount-row').remove();
            updateActionButtons(amountInputsContainer, '.amount-row');
        }
    }
});

arrangementRowsContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('action-button')) {
        if (target.textContent === '+') {
            createArrangementRow();
        } else if (target.textContent === '-') {
            target.closest('.arrangement-row').remove();
            updateActionButtons(arrangementRowsContainer, '.arrangement-row');
        }
    }
});

statusOptionsContainer.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('status-option')) {
        setStatus(target);
    }
});

callerTypeOptions.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('caller-type-option')) {
        setCallerType(target);
    }
});

actionLabel.addEventListener('click', function(event) {
    event.stopPropagation();
    actionOptions.classList.toggle('hidden');
});

actionOptions.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('action-option-item')) {
        const selectedText = target.textContent;
        if (selectedText === 'Blank') {
            actionSelection.textContent = '';
        } else {
            actionSelection.textContent = ' ' + selectedText;
        }
        actionOptions.classList.add('hidden');
    }
});

callReasonLabel.addEventListener('click', function(event) {
    event.stopPropagation();
    callReasonOptions.classList.toggle('hidden');
});

callReasonOptions.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('call-reason-option-item')) {
        callReasonSelection.textContent = target.textContent;
        callReasonOptions.classList.add('hidden');
    }
});

addBankOption.addEventListener('click', function() {
    toggleOption(addBankOption);
});

addCardOption.addEventListener('click', function() {
    toggleOption(addCardOption);
    const isActive = addCardOption.textContent.endsWith('*');
    lastFourInput.classList.toggle('hidden', !isActive);
    if(isActive) {
        lastFourInput.focus();
    }
});

lastFourInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

document.addEventListener('click', function(event) {
    if (actionOptions && !actionOptions.classList.contains('hidden') && !actionOptions.contains(event.target)) {
        actionOptions.classList.add('hidden');
    }
    if (callReasonOptions && !callReasonOptions.classList.contains('hidden') && !callReasonOptions.contains(event.target)) {
        callReasonOptions.classList.add('hidden');
    }
});