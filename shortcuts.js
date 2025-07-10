function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getHardshipAnswers() {
    let answers = ['[Customer Answers]'];
    const questions = document.querySelectorAll('#hardshipQuestionsContainer .hardship-question-group');
    questions.forEach((group) => {
        const label = group.querySelector('div').textContent;
        const textInput = group.querySelector('input[type="text"], textarea');
        let answer = 'N/A';
        
        if (textInput && textInput.value.trim() !== '') {
            answer = textInput.value.trim();
        } else {
            const radioOptions = group.querySelectorAll('.yesno-option');
            if (radioOptions.length > 0) {
                radioOptions.forEach(opt => {
                    if (opt.textContent.includes('[')) {
                        answer = opt.dataset.value;
                    }
                });
            }
        }
        answers.push(capitalizeFirstLetter(label));
        answers.push(answer);
    });
    return answers.join('\n');
}


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();

        const textArea = document.querySelector('.text-area');
        const copyNotification = document.getElementById('copy-notification');
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateString = `${day}/${month}/${year}`;
        
        const noteHeader = `${userInitials} ${timeString} ${dateString}`;
        
        let noteActions = [];
        let arrangementLines = [];
        const isNoAnswer = document.getElementById('no-answer-option').textContent.endsWith('*');

        if (isNoAnswer) {
            noteActions.push('- No answer');
            const selectedAction = document.getElementById('action-selection').textContent.trim();
            if (selectedAction) {
                noteActions.push(`- ${capitalizeFirstLetter(selectedAction)}`);
            }
        } else {
            let housekeepingChanged = false;

            let selectedType = '';
            document.querySelectorAll('.caller-type-option').forEach(opt => {
                if (opt.textContent.includes('[')) {
                    selectedType = opt.dataset.callerType;
                }
            });
            if (selectedType) {
                const verification = (selectedType === 'UTP') ? 'unverified' : 'verified';
                noteActions.push(`- ${selectedType} | ${capitalizeFirstLetter(verification)}`);
            }
            
            const callReason = document.getElementById('call-reason-selection').textContent;
            if (callReason) {
                noteActions.push(`- Call reason: ${capitalizeFirstLetter(callReason)}`);
            }
            
            const mainText = textArea.value.trim();
            if (mainText) {
                const discussionLines = mainText.split('\n')
                    .filter(line => line.trim() !== '')
                    .map(line => `- ${capitalizeFirstLetter(line.trim())}`);
                noteActions.push(...discussionLines);
            }

            if (document.getElementById('hardship-option').textContent.endsWith('*')) {
                noteActions.push('- Hardship discussed');
            }

            if (document.getElementById('add-bank-option').textContent.endsWith('*')) {
                noteActions.push('- Customer wants to add BSB. Direct debit form sent.');
            }
            if (document.getElementById('add-card-option').textContent.endsWith('*')) {
                const lastFour = document.getElementById('last-four-input').value;
                if (lastFour.length === 4) {
                    noteActions.push(`- Added new card on the account ending in ${lastFour}`);
                }
            }
        }
        
        if (document.getElementById('arrangement-option').textContent.endsWith('*')) {
            const arrangementRows = document.querySelectorAll('.arrangement-row');
            let tempArrangementLines = [];
            arrangementRows.forEach(row => {
                const amount = row.querySelector('.arrangement-amount').value;
                const date = row.querySelector('.date-display').textContent;
                if (amount && date !== '//') {
                    tempArrangementLines.push(`- $${amount} set for ${date}`);
                }
            });
            if (tempArrangementLines.length > 0) {
                noteActions.push(`- ${tempArrangementLines.length} arrangement${tempArrangementLines.length > 1 ? 's' : ''} made.`);
                arrangementLines.push(...tempArrangementLines);
            }
        }

        if (document.getElementById('payment-taken-option').textContent.endsWith('*')) {
            const amountInputs = document.querySelectorAll('.amount-input');
            let paymentCount = 0;
            let totalAmount = 0;
            amountInputs.forEach(input => {
                const amount = parseFloat(input.value);
                if (!isNaN(amount) && amount > 0) {
                    paymentCount++;
                    totalAmount += amount;
                }
            });

            if (paymentCount > 0) {
                const paymentStrings = ["Zero", "One", "Two", "Three", "Four", "Five"];
                const countString = paymentCount < paymentStrings.length ? paymentStrings[paymentCount] : paymentCount;
                
                const selectedStatusOption = document.querySelector('.status-option[data-status="Current"]').textContent.includes('[') ? 'Current' : 'Arrears';
                let statusString = selectedStatusOption === 'Current' ? 'account back to current' : 'account still in arrears';
                
                noteActions.push(`- ${capitalizeFirstLetter(countString)} payment${paymentCount > 1 ? 's' : ''} taken [$${totalAmount.toFixed(2)}] in total. ${capitalizeFirstLetter(statusString)}`);
                
                if (selectedStatusOption === 'Current') {
                    noteActions.push('- Collections module closed');
                }
            }
        }
        
        if (!isNoAnswer) {
             let housekeepingChanged = false;
             if (document.getElementById('email-option').textContent.endsWith('*')) {
                const email = document.getElementById('email-input').value;
                if (email) {
                    noteActions.push(`- Email updated to ${email}`);
                    housekeepingChanged = true;
                }
            }
            if (document.getElementById('atp-option').textContent.endsWith('*')) {
                const selectedAtpType = document.querySelector('.atp-type-option[data-atp-type="New"]').textContent.includes('[') ? 'New' : 'Updated';
                if (selectedAtpType === 'New') {
                    noteActions.push('- Added new ATP to the account');
                } else {
                    noteActions.push('- Updated ATP information');
                }
                housekeepingChanged = true;
            }

            if (!housekeepingChanged) {
                 noteActions.push('- Housekeeping details are current');
            }

            if (document.getElementById('npd-option').textContent.endsWith('*')) {
                const npdDate = document.getElementById('npd-date-display').textContent;
                if (npdDate) {
                    noteActions.push(`- Advised NPD will be ${npdDate}`);
                }
            }
            if (document.getElementById('sso-option').textContent.endsWith('*')) {
                noteActions.push('- Self-service option provided.');
            }
            noteActions.push('- Eoc');
        }
        
        let fullNote = noteHeader;
        if (noteActions.length > 0) {
            fullNote += '\n' + noteActions.map(line => capitalizeFirstLetter(line)).join('\n');
        }
        if (arrangementLines.length > 0) {
             fullNote += '\n' + arrangementLines.map(line => capitalizeFirstLetter(line)).join('\n');
        }

        if (document.getElementById('hardship-option').textContent.endsWith('*')) {
             fullNote += '\n\n\n' + getHardshipAnswers();
        }

        navigator.clipboard.writeText(fullNote).then(() => {
            copyNotification.textContent = 'Note Copied!';
            copyNotification.classList.add('show');
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy note: ', err);
        });
    }
});