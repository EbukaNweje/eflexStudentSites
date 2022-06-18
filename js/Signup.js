import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  getDatabase, ref, set, child, get,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js';
import firebaseConfig from './apikey.js';
// console.log(API_KEY)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// --------------------------------------THE REFRENECES---------------------------------------------------------//
const name = document.getElementById('FullName');
const emails = document.getElementById('Email');
const password1 = document.getElementById('PassWord1');
const password2 = document.getElementById('Password2');
const submit = document.getElementById('Submit');
const Image = document.querySelector('#file');
const preview = document.querySelector('.Cove');
const preview2 = document.querySelector('.left');

// --------------------------------------VALIDATION---------------------------------------------------------//
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function validation() {
  const namereegex = /^[a-zA-Z\s]+$/;
  const email = /^[a-z0-9]+@(gmail|yahoo|outlook)\.com$/;

  if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(emails.value) || isEmptyOrSpaces(password1.value) || isEmptyOrSpaces(password2.value)) {
    alert('you cannot left any field empty');
    return false;
  }

  if (!namereegex.test(name.value)) {
    alert('the name should only contain alphabets!');
    return false;
  }

  if (!email.test(emails.value)) {
    alert('enter a valid email \n Email should only contain lowerCase!');
    return false;
  }

  if (password1.value !== password2.value) {
    alert('Password does not match');
    return false;
  }
  return true;
}

// --------------------------------------ASSIGN THE EVENTS---------------------------------------------------------//

submit.addEventListener('click', RegisterUser);

// --------------------------------------IMAGE UPLOAD EVENTS---------------------------------------------------------//
Image.onchange = (event) => {
  if (event.target.files.length > 0) {
    const src = URL.createObjectURL(event.target.files[0]);
    const preview = document.querySelector('.Cove');
    const preview2 = document.querySelector('.left');
    preview.style.backgroundImage = `url(${src})`;
    preview2.style.backgroundImage = 'none';
  }
};

// --------------------------------------REGISTER USER TO FIREBASE-------------------------------------------------//

function RegisterUser() {
  if (!validation()) {
    return;
  }
  SendData();
}

document.querySelector('#file').addEventListener('change', Imageshow);
function Imageshow() {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    sessionStorage.setItem('profile', reader.result);
  });

  reader.readAsDataURL(this.files[0]);
}

const GetProfile = sessionStorage.getItem('profile');
console.log(GetProfile);

function SendData() {
  const dbRef = ref(db);
  get(child(dbRef, `UserList/${name.value}`)).then((snapshot) => {
    if (snapshot.exists()) {
      alert('Account Already Exist!');
    } else {
      set(ref(db, `UserList/${name.value}`),
        {
          fullname: name.value,
          email: emails.value,
          passwords: encPass(),
          profile: GetProfile,
        })
        .then(() => {
          alert('user added successfuly');
          name.value = '';
          emails.value = '';
          password1.value = '';
          password2.value = '';
          preview.style.backgroundImage = 'none';
          preview2.style.backgroundImage = 'url(/images/jUkV4DHjgtYAPqK7jSp8aa-1200-80.png)';
          window.location = 'index.html';
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  });
}
// --------------------------------------ENCRIPTTION---------------------------------------------------//

function encPass() {
  const passwordEnc = CryptoJS.AES.encrypt(password1.value, password1.value);
  return passwordEnc.toString();
}