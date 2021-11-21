import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  feedbackInput: document.querySelector('.feedback-form input'),
  feedbackTextarea: document.querySelector('.feedback-form textarea'),
};

const keylocalStorageUser = 'feedback-form-state';
let dataUser = {};

if (localStorage.getItem(keylocalStorageUser)) {
  dataUser = JSON.parse(localStorage.getItem(keylocalStorageUser));
  refs.feedbackInput.value = dataUser.email;
  refs.feedbackTextarea.value = dataUser.password;
}

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackInput.addEventListener('input', throttle(onFormInput, 500));
refs.feedbackTextarea.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  refs.feedbackInput.value = '';
  refs.feedbackTextarea.value = '';
  console.log(dataUser);
  localStorage.removeItem(keylocalStorageUser);
}

function onFormInput(e) {
  let formData = new FormData(refs.feedbackForm);
  formData.forEach((value, name) => {
    if (name === 'email') {
      value = value.toLocaleLowerCase();
    }
    if (name === 'message') {
      name = 'password';
    }
    dataUser[name] = value;
  });

  localStorage.setItem(keylocalStorageUser, JSON.stringify(dataUser));
  refs.feedbackInput.value = refs.feedbackInput.value.toLocaleLowerCase();
}
