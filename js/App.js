const ArryInfo = [
  {
    Project: 'Html Introduction',
    Work: 'Exercise',
    Days: 'Monday',
  },

  {
    Project: 'Html Introduction',
    Work: 'Project',
    Days: 'Tuesday',
  },

  {
    Project: 'Html Introduction',
    Work: 'Exercise',
    Days: 'Wednesday',
  },

  {
    Project: 'Html Introduction',
    Work: 'Project',
    Days: 'Thursday',
  },

  {
    Project: 'Html Introduction',
    Work: 'Quiz',
    Days: 'Friday',
  },

];

// console.log('ArryInfo', ArryInfo)

const rightNavContent = document.querySelector('.rightNavContent');
ArryInfo.forEach((element) => {
  const reander = `
  <div class="navRows">
  <p><a href="#">${element.Project}</a></p>
  <h4> ${element.Work} </h4>
  <h4> ${element.Days} </h4>
  <button> Submit </button>
</div>
  `;
  rightNavContent.innerHTML += reander;
});

document.getElementById('SignOut').addEventListener('click', Signouts)

function Signouts(){
  sessionStorage.removeItem('user');
  localStorage.removeItem('user');
  localStorage.removeItem('keeploggedIn');
  window.location= "index.html"
}

const Data = JSON.parse(sessionStorage.getItem('user'))
console.log(Data)

const NameShow = document.getElementById('NameShow')
NameShow.innerHTML += "Hello! " + Data.fullname

const profile = document.querySelector('.profile')
profile.style.backgroundImage = `url(${Data.profile})`

const today = new Date()
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ||' + ' ' + today.getHours() + ":" + today.getMinutes();
console.log(date)

const DateShow = document.getElementById('Date')
DateShow.innerHTML += date
