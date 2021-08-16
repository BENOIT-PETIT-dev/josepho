const fileInput = document.querySelector('input[name="baseImage"]');
const triggerObject = document.querySelector('.trigger-object');

triggerObject.addEventListener('click', () => {
  fileInput.click();
});
