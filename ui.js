const formatMenuButton = document.getElementById('format-menu-button');
const formatDropdown = document.getElementById('format-dropdown');
const allDropdowns = document.querySelectorAll('.dropdown-menu');
const hardshipMenuButton = document.getElementById('hardship-menu-button');
const notepadMenuButton = document.getElementById('notepad-menu-button');
const notepadPanel = document.getElementById('notepad-panel');
const hardshipPanel = document.getElementById('hardship-panel');

function closeAllDropdowns() {
    allDropdowns.forEach(menu => {
        if (menu) {
            menu.classList.remove('show');
        }
    });
}

function toggleDropdown(button, dropdown) {
    if (!button || !dropdown) return;
    const isAlreadyOpen = dropdown.classList.contains('show');
    closeAllDropdowns();
    if (!isAlreadyOpen) {
        dropdown.classList.add('show');
    }
}

function showPanel(panelId) {
    if (notepadPanel) notepadPanel.classList.add('hidden');
    if (hardshipPanel) hardshipPanel.classList.add('hidden');
    
    const panelToShow = document.getElementById(panelId);
    if (panelToShow) {
        panelToShow.classList.remove('hidden');
    }

    if (panelId === 'hardship-panel') {
        if(hardshipMenuButton) hardshipMenuButton.style.fontWeight = 'bold';
        if(notepadMenuButton) notepadMenuButton.style.fontWeight = 'normal';
    } else {
        if(hardshipMenuButton) hardshipMenuButton.style.fontWeight = 'normal';
        if(notepadMenuButton) notepadMenuButton.style.fontWeight = 'bold';
    }
}

if (formatMenuButton) {
    formatMenuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown(formatMenuButton, formatDropdown);
    });
}

if (hardshipMenuButton) {
    hardshipMenuButton.addEventListener('click', function(event) {
        event.preventDefault();
        showPanel('hardship-panel');
    });
}

if (notepadMenuButton) {
    notepadMenuButton.addEventListener('click', function(event) {
        event.preventDefault();
        showPanel('notepad-panel');
    });
}

document.addEventListener('click', function(event) {
    closeAllDropdowns();
});