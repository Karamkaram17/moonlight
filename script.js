const container = document.getElementById("container");
const comandsection = document.getElementById("comandsection");

//for fetching data from api
var DATA = [];
var menutype = [];

fetch("https://moonlight-znjk.onrender.com/data")
  .then((response) => response.json())
  .then((data) => {
    loader();
    DATA = data.items;
    menuTypes();
    displayMenu();
    menuBtnF();
  });

//function for setting the categories
function menuTypes() {
  const menutypes = [];
  DATA.forEach((element) => {
    if (element.category != undefined) {
      menutypes.push(element.category);
    }
  });
  menutype = menutypes.filter(
    (item, index) => menutypes.indexOf(item) === index
  );
}

//for creating and displaying each categorie in its own section
function displayMenu() {
  menutype.forEach((type) => {
    let item = document.createElement("section");
    item.className = "menutype";
    item.id = `menutype${menutype.indexOf(type) + 1}`;
    item.innerHTML = `<img src="images/${type}.jpg" alt="${type}-pic" /><h1>${capitalizeFirstLetter(
      type
    )}</h1>`;
    //diplaying each item in its own menu type
    DATA.forEach((element) => {
      if (element.category == type && element.category != undefined) {
        if (element.name !== undefined) {
          if (element.description !== undefined && element.description !== "") {
            item.innerHTML += `<article class="menuitem"onclick="show('${
              element.category
            }${DATA.indexOf(element)}')">
              <p class="flavor">${element.name}<i class="ibtn" id="${
              element.category
            }${DATA.indexOf(element)}x" >+</i></p>
              <p class="price">${element.price}</p>
              <p class="descdiv" id="${element.category}${DATA.indexOf(
              element
            )}" style="display: none;">${element.description}</p>
            </article>`;
          } else {
            item.innerHTML += `<article class="menuitem">
              <p class="flavor">${element.name}</p>
              <p class="price">${element.price}</p>
            </article>`;
          }
        }
      }
    });
    //shortcut btns for each type
    comandsection.innerHTML += `<button id="section${
      menutype.indexOf(type) + 1
    }btn" onclick="functionality('${type}')">${capitalizeFirstLetter(
      type
    )}</button>`;
    container.appendChild(item);
  });
}

//menu btn functionality
function menuBtnF() {
  document.getElementById("menubtn").onclick = function () {
    document.getElementById("header").style.display = "none";
    document.getElementById("comandsection").style.display = "block";
    menutype.forEach((elm) => {
      document.getElementById(
        `menutype${menutype.indexOf(elm) + 1}`
      ).style.display = "none";
    });
    document.getElementById("menubtn").style.display = "none";
    document.getElementById("container").style.marginTop = "30px";
  };
}

//functions used inline =====================================
//each type btn functionality
function functionality(type) {
  document.getElementById("header").style.display = "block";
  document.getElementById("comandsection").style.display = "none";
  document.getElementById("menubtn").style.display = "block";
  document.getElementById("container").style.marginTop = "0";
  menutype.forEach((elm) => {
    document.getElementById(
      `menutype${menutype.indexOf(elm) + 1}`
    ).style.display = "none";
  });
  document.getElementById(
    `menutype${menutype.indexOf(type) + 1}`
  ).style.display = "block";
}

//more info function for info btn
function show(elm) {
  let x = document.getElementById(elm);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  let y = document.getElementById(elm + "x");
  if (y.innerText === "+") {
    y.innerText = "_";
    y.style.paddingBottom = "6px";
  } else {
    y.innerText = "+";
    y.style.paddingBottom = "0";
  }
}

function capitalizeFirstLetter(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// footer
let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;

//screen loader
function loader() {
  document.getElementById("content").style.display = "block";
  document.getElementById("loading-screen").style.display = "none";
}
