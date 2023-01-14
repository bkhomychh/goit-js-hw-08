import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackFormRef = document.querySelector('.feedback-form');
const { email: emailRef, message: messageRef } = feedbackFormRef.elements;
const storageData = loadData();

if (storageData) {
  emailRef.value = storageData.email;
  messageRef.value = storageData.message;
}

feedbackFormRef.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormRef.addEventListener('submit', onFeedbackFormSubmit);

function onFeedbackFormInput() {
  const formData = getFormData();

  saveData(formData);
}

function getFormData() {
  const formData = {};

  formData.email = emailRef.value;
  formData.message = messageRef.value;

  return formData;
}

function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data === null ? undefined : JSON.parse(data);
  } catch (error) {
    console.log(error.name + ': ' + error.message);
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error.name + ': ' + error.message);
  }
}

function onFeedbackFormSubmit(evt) {
  evt.preventDefault();

  if (emailRef.value !== '' && messageRef.value !== '') {
    const formData = getFormData();

    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    feedbackFormRef.reset();
  } else {
    console.log('Fill in all fields of the form');
  }
}
