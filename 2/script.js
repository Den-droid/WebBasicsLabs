const fullnameRegex = /^\p{Lu}{1}\p{L}{1,} \p{Lu}{1}[.]{1}\p{Lu}{1}[.]{1}$/ugm;
const idCardRegex = /^\p{Lu}{2} №[0-9]{5,}$/ugm;
const facultyRegex = /^\p{Lu}{3,}$/ugm;
const phoneNumberRegex = /^[(]?[0-9]{3}[)]?\-?\ ?[0-9]{3}\-?\ ?[0-9]{2}\-?\ ?[0-9]{2}$/;

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

function setRows() {
  let table = document.getElementById("table");
  let colorPicker = document.getElementById("color-picker");
  for (let i = 0; i < 6; i++) {
    let row = table.insertRow();
    for (let j = 1; j < 7; j++) {
      let cell = row.insertCell();
      cell.textContent = i * 6 + j;
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = rgb(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        );
      });
      cell.addEventListener("mouseout", () => {
        cell.style.backgroundColor = rgb(255, 255, 255);
      });
      cell.addEventListener("click", () => {
        cell.style.backgroundColor = colorPicker.value;
      });
    }
  }

  for (let i = 0; i < 6; i++) {
    let row = table.rows[i];
    for (let j = 0; j < 6; j++) {
      let colIndex = j;
      let cell = row.cells[colIndex];

      cell.addEventListener("dblclick", () => {
        for (let currRow = 0; currRow < 6; currRow++) {
          for (let currCol = colIndex; currCol >= 0; currCol -= 2) {
            table.rows[currRow].cells[currCol].style.backgroundColor =
              colorPicker.value;
          }
          for (let currCol = colIndex; currCol < 6; currCol += 2) {
            table.rows[currRow].cells[currCol].style.backgroundColor =
              colorPicker.value;
          }
        }
      });
    }
  }
}

function submitForm () {
    let fullname = document.getElementById("fullname");
    let phone = document.getElementById("phone-number");
    let idCard = document.getElementById("id-card");
    let faculty = document.getElementById("faculty");
    let birthday = document.getElementById("birthday");

    let correct = true;

    if (fullname.value.match(fullnameRegex)) {
        fullname.style.border = "2px solid green";
    } else {
        fullname.style.border = "2px solid red";
        correct = false;
    }

    if (phone.value.match(phoneNumberRegex)) {
        phone.style.border = "2px solid green";
    } else {
        phone.style.border = "2px solid red";
        correct = false;
    }

    if (idCard.value.match(idCardRegex)) {
        idCard.style.border = "2px solid green";
    } else {
        idCard.style.border = "2px solid red";
        correct = false;
    }

    if (faculty.value.match(facultyRegex)) {
        faculty.style.border = "2px solid green";
    } else {
        faculty.style.border = "2px solid red";
        correct = false;
    }

    if (birthday.value) {
        birthday.style.border = "2px solid green";
    } else {
        birthday.style.border = "2px solid red";
        correct = false;
    }

    if (correct) {
        let showData = document.getElementById("show-data-div");

        if (showData) {
            let enteredFullname = document.getElementById("entered-fullname");
            let enteredPhoneNumber = document.getElementById("entered-phone-number");
            let enteredIdCard = document.getElementById("entered-id-card");
            let enteredFaculty = document.getElementById("entered-faculty");
            let enteredBirthday = document.getElementById("entered-birthday");

            enteredFullname.textContent = fullname.value;
            enteredPhoneNumber.textContent = phone.value;
            enteredIdCard.textContent = idCard.value;
            enteredFaculty.textContent = faculty.value;
            enteredBirthday.textContent = birthday.value;
        } else {
            let validationForm = document.getElementById("form-validation-div");
			validationForm.style.width = "65%";

            // set width
            let formDiv = document.getElementById("form-div");
            formDiv.style.width = "65%";

            showData = document.createElement("div");
            showData.id = "show-data-div";
            showData.style.width = "35%";

            // set caption
            let caption = document.createElement("h2");
            caption.textContent = "Введені дані:";

            // set fullname
            let fullnameParagraph = document.createElement("p");
            fullnameParagraph.textContent = "ПІБ: ";
            fullnameParagraph.style.fontWeight = "bold";

            let enteredFullname = document.createElement("span");
            enteredFullname.style.fontWeight = "normal";
            enteredFullname.id = "entered-fullname";
            enteredFullname.textContent = fullname.value;

            fullnameParagraph.appendChild(enteredFullname);

            // set phone number
            let phoneNumberParagraph = document.createElement("p");
            phoneNumberParagraph.textContent = "Номер телефону: ";
            phoneNumberParagraph.style.fontWeight = "bold";
            
            let enteredPhoneNumber = document.createElement("span");
            enteredPhoneNumber.style.fontWeight = "normal";
            enteredPhoneNumber.id = "entered-phone-number";
            enteredPhoneNumber.textContent = phone.value;

            phoneNumberParagraph.appendChild(enteredPhoneNumber);

            // set id card
            let idCardParagraph = document.createElement("p");
            idCardParagraph.textContent = "ID картка: ";
            idCardParagraph.style.fontWeight = "bold";
            
            let enteredIdCard = document.createElement("span");
            enteredIdCard.style.fontWeight = "normal";
            enteredIdCard.id = "entered-id-card";
            enteredIdCard.textContent = idCard.value;

            idCardParagraph.appendChild(enteredIdCard);

            // set faculty
            let facultyParagraph = document.createElement("p");
            facultyParagraph.textContent = "Факультет: ";
            facultyParagraph.style.fontWeight = "bold";
            
            let enteredFaculty = document.createElement("span");
            enteredFaculty.style.fontWeight = "normal";
            enteredFaculty.id = "entered-faculty";
            enteredFaculty.textContent = faculty.value;

            facultyParagraph.appendChild(enteredFaculty);

            // set birthday
            let birthdayParagraph = document.createElement("p");
            birthdayParagraph.textContent = "День народження: ";
            birthdayParagraph.style.fontWeight = "bold";
            
            let enteredBirthday = document.createElement("span");
            enteredBirthday.style.fontWeight = "normal";
            enteredBirthday.id = "entered-birthday";
            enteredBirthday.textContent = birthday.value;

            birthdayParagraph.appendChild(enteredBirthday);

            // append all paragraphs
            showData.appendChild(caption);
            showData.appendChild(fullnameParagraph);
            showData.appendChild(phoneNumberParagraph);
            showData.appendChild(idCardParagraph);
            showData.appendChild(facultyParagraph);
            showData.appendChild(birthdayParagraph);

            validationForm.appendChild(showData);
        }

    } else {
        alert("Введіть коректні дані!");
    }
}

setRows();

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitForm);