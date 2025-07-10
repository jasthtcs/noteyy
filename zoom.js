const textAreaContainer = document.querySelector('.text-area-container');
const zoomStatus = document.getElementById('zoom-status');

const baseFontSize = 12; 
let currentFontSize = baseFontSize;

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === '+' || event.key === '=') {
            event.preventDefault(); 
            currentFontSize += 2;
            updateZoom();
        } else if (event.key === '-') {
            event.preventDefault();
            if (currentFontSize > 4) {
                currentFontSize -= 2;
                updateZoom();
            }
        }
    }
});

function updateZoom() {
    textAreaContainer.style.fontSize = `${currentFontSize}px`;
    const zoomPercentage = Math.round((currentFontSize / baseFontSize) * 100);
    zoomStatus.textContent = `${zoomPercentage}%`;
}