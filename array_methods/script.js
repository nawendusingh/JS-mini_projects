const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
// fetch random usser and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// function double money

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// sort user by richest
function sortByMoney() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// show millionaire

function showMillionairesonly() {
  data = data.filter(a => a.money > 99999);
  updateDom();
}

// add all money
function calculateWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthElement);
  //   updateDom();
}
// add object to data-array

function addData(obj) {
  data.push(obj);
  updateDom();
}

function updateDom(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach(item => {
    //   create a div for each element
    const element = document.createElement("div");
    //   add a class to the div
    element.classList.add("person");
    // create the html
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    //   insert to dom
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByMoney);
showMillionairesBtn.addEventListener("click", showMillionairesonly);
calculateWealthBtn.addEventListener("click", calculateWealth);
