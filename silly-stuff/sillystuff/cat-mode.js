import {
  catModeToggle, isPressing, startPress, stopPress
} from 'scripts.js';

// Cat Mode functionality
const modalOverlay = document.querySelector('.modal-overlay');
const yesButton = document.querySelector('.modal-button.yes');
const noButton = document.querySelector('.modal-button.no');

catModeToggle.addEventListener('change', () => {
  if (catModeToggle.checked) {
    modalOverlay.style.display = 'block';
    catModeToggle.checked = false;
  } else {
    document.body.classList.remove('cat-mode');
  }
});

// Handle both click and touch for Yes button
yesButton.addEventListener('click', handleYes);
yesButton.addEventListener('touchend', (e) => {
  e.preventDefault();
  handleYes();
});

// Handle both click and touch for No button
noButton.addEventListener('click', handleNo);
noButton.addEventListener('touchend', (e) => {
  e.preventDefault();
  handleNo();
});

function handleYes() {
  modalOverlay.style.display = 'none';
  catModeToggle.checked = true;
  document.body.classList.add('cat-mode');
}

function handleNo() {
  modalOverlay.style.display = 'none';
  catModeToggle.checked = false;
  if (isPressing) {
    stopPress();
  }
}

// Enable spin on click anywhere in cat mode
document.addEventListener('mousedown', (e) => {
  if (catModeToggle.checked && e.button === 0) { // Explicitly check for left click
    startPress();
  } else if (isPressing) {
    stopPress(); // Stop spinning if any other mouse button is pressed
  }
});

document.addEventListener('mouseup', (e) => {
  if (catModeToggle.checked && e.button === 0) {
    stopPress();
  }
});

// Touch support for cat mode
document.addEventListener('touchstart', (e) => {
  if (catModeToggle.checked && !e.target.closest('.mode-toggle')) {
    e.preventDefault();
    e.stopPropagation();
    startPress();
  }
}, { passive: false });

document.addEventListener('touchend', (e) => {
  if (catModeToggle.checked && !e.target.closest('.mode-toggle')) {
    e.preventDefault();
    e.stopPropagation();
    stopPress();
  }
}, { passive: false });

document.addEventListener('contextmenu', (e) => {
  if (catModeToggle.checked) {
    e.preventDefault();
  }
});

// Prevent touch events from propagating from toggle
const modeToggle = document.querySelector('.mode-toggle');
modeToggle.addEventListener('touchstart', (e) => {
  e.stopPropagation();
});

modeToggle.addEventListener('touchend', (e) => {
  e.stopPropagation();
});