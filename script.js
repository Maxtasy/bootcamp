const copyButtonElement = document.querySelector('#copy-button');
const removeButtonElement = document.querySelector('#remove-button');

copyButtonElement.addEventListener('click', () => {
  const normanCardElement = document.querySelector('.Section:has(.Norman)');
  const normanCardCloneElement = normanCardElement.cloneNode(true);
  normanCardElement.after(normanCardCloneElement);
});

removeButtonElement.addEventListener('click', () => {
  const allNormanCardElements = document.querySelectorAll('.Section:has(.Norman)');

  if (allNormanCardElements.length > 1) {
    allNormanCardElements[allNormanCardElements.length - 1].remove();
  }
});
