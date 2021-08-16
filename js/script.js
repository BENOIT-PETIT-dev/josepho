let STATE = {
  activePage: 1
}

const fileInput = document.querySelector('input[name="baseImage"]');
const validateButton = document.querySelector('.submit-photo');
const developAgainButton = document.querySelector('.develop-again');

const initActivePage = () => {
  setActivePage(1);
}

const setActivePage = (number) => {
  STATE.activePage = number;
  document.querySelectorAll(`[data-page-active]:not(:nth-child(${number}))`).forEach(el => {
    el.setAttribute('data-page-active', false);
  });
  document.querySelector(`[data-page-active]:nth-child(${number})`).setAttribute('data-page-active', true);
}

document.addEventListener("DOMContentLoaded", function() {
  initActivePage();
});

fileInput.addEventListener('input', () => {
  setActivePage(2);
});

validateButton.addEventListener('click', () => {
  setActivePage(3);
});

developAgainButton.addEventListener('click', () => {
  setActivePage(1);
  document.querySelector('.final-photo-link').href = '';
  document.querySelector('.final-photo').src = '';
})