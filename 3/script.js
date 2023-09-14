function createPersonDiv(imgUrl, name, country, postcode, phone) {
  let dataDiv = document.getElementById("data-div");

  let personDiv = document.createElement("div");
  personDiv.classList.add("person-div");

  let image = document.createElement("img");
  image.src = imgUrl;

  let personInfoDiv = document.createElement("div");
  personInfoDiv.classList.add("person-info-div");

  let nameParagraph = document.createElement("p");
  nameParagraph.textContent = "Name: " + name;

  let countryParagraph = document.createElement("p");
  countryParagraph.textContent = "Country: " + country;

  let postcodeParagraph = document.createElement("p");
  postcodeParagraph.textContent = "Postcode: " + postcode;

  let phoneParagraph = document.createElement("p");
  phoneParagraph.textContent = "Phone: " + phone;

  personInfoDiv.appendChild(nameParagraph);
  personInfoDiv.appendChild(countryParagraph);
  personInfoDiv.appendChild(postcodeParagraph);
  personInfoDiv.appendChild(phoneParagraph);

  personDiv.appendChild(image);
  personDiv.appendChild(personInfoDiv);

  dataDiv.appendChild(personDiv);
}

function addPerson() {
  fetch("https://randomuser.me/api")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let person = data.results[0];

      let pictureUrl = person.picture.large;
      let fullname = person.name.title + " " + person.name.first + " " + person.name.last;
      let country = person.location.country;
      let postcode = person.location.postcode;
      let phone = person.phone;

      createPersonDiv(pictureUrl, fullname, country, postcode, phone);
    });
}

function removeAllPersons() {
  let personsDiv = document.getElementById("data-div");
  let allPersons = document.getElementsByClassName("person-div");
  
  while (allPersons.length > 0) {
    personsDiv.removeChild(allPersons[0]);
  }
}

let addPersonButton = document.getElementById("add-person-button");
addPersonButton.addEventListener("click", addPerson);

let removeAllButton = document.getElementById("remove-all-button");
removeAllButton.addEventListener("click", removeAllPersons);