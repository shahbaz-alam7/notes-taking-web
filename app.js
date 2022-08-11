// console.log("hello");
shownotes();
//If a user adds a notes and title, add it to the local storage
let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let addtitle = document.getElementById("title");
  let addtxt = document.getElementById("addNote");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addtitle.value,
    text: addtxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  title.value = "";
  shownotes();
});

// function to show element from local storage
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
              <div class="cardnote mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"> ${index + 1} ${element.title}</h5>
                  <p id="para" class="card-text"> ${element.text}</p>
                  <button id="${index}" onclick="deleten(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>`;
  });
  let noteselm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteselm.innerHTML = html;
  } else {
    noteselm.innerHTML = `<h1>We have nothing to show you, please use add note above</h1>`;
  }
}
// ! Deleting notes
function deleten(index) {
  // console.log("delete", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}

// Searching text
let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value;
  let cardNote = document.getElementsByClassName("cardnote");
  Array.from(cardNote).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
