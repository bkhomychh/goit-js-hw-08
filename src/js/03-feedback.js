import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const storageData = loadData();
const feedbackFormRef = document.querySelector('.feedback-form');

let formData = storageData ? storageData : {};

init();

feedbackFormRef.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormRef.addEventListener('submit', onFeedbackFormSubmit);

function getFormElNames(formRef) {
  const formElNames = Object.keys(formRef.elements);
  return formElNames.filter(name => !(name >= 0));
}

function init() {
  if (!storageData) {
    return;
  }

  const formElNames = getFormElNames(feedbackFormRef);
  formElNames.forEach(name => {
    feedbackFormRef.elements[name].value = storageData[name]
      ? storageData[name]
      : '';
  });
}

function onFeedbackFormInput({ target }) {
  formData[target.name] = target.value;
  saveData(formData);
}

function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    showError(error);
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    showError(error);
  }
}

function onFeedbackFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
  feedbackFormRef.reset();
}

function showError(error) {
  console.log(error.name + ': ' + error.message);
}
