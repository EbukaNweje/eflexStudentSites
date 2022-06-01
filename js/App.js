const ArryInfo = [
  {
    Project: "Html Introduction",
    Work: "Exercise",
    Days: "Monday"
  },

  {
    Project: "Html Introduction",
    Work: "Project",
    Days: "Tuesday"
  },

  {
    Project: "Html Introduction",
    Work: "Exercise",
    Days: "Wednesday"
  },

  {
    Project: "Html Introduction",
    Work: "Project",
    Days: "Thursday"
  },

  {
    Project: "Html Introduction",
    Work: "Quiz",
    Days: "Friday"
  },

]

console.log(ArryInfo)

const rightNavContent = document.querySelector(".rightNavContent")
ArryInfo.forEach((element) => {
  const reander = `
  <div class="navRows">
  <p><a href="#">${element.Project}</a></p>
  <h4> ${element.Work} </h4>
  <h4> ${element.Days} </h4>
  <button> Submit </button>
</div>
  `
  rightNavContent.innerHTML += reander
});
