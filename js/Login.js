import initializeApp from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import {
  getDatabase, ref, child, get,
} from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js';
import firebaseConfig from './apikey.js';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// --------------------------------------LOGIN PATH---------------------------------------------------------//
// --------------------------------------THE REFRENECES---------------------------------------------------------//
const name = document.getElementById('FullName');
const password = document.getElementById('Password1');
const submit = document.getElementById('Submit');

function AuthenticateUser() {
  const dbref = ref(db);

  get(child(dbref, `UserList/${name.value}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const dbpass = decPass(snapshot.val().passwords);
      if (dbpass === password.value) {
        login(snapshot.val());
      } else {
        alert('user does not exist');
      }
    } else {
      alert('username or password is invalid');
    }
  });
}

// --------------------------------------DECRIPT PROCESS-----------------------------------------------------/

function decPass(dbpass) {
  const passwordEnc = CryptoJS.AES.decrypt(dbpass, password.value);
  return passwordEnc.toString(CryptoJS.enc.Utf8);
}

// --------------------------------------LOGIN PROCESS-----------------------------------------------------/
function login(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
  window.location = 'dashboard.html';
}

// --------------------------------------ASSIGN THE EVENTS TO LOGIN PATH-------------------------------------------------//
submit.addEventListener('click', AuthenticateUser);