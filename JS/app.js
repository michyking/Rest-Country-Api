const toggleIcon = document.querySelector(".toggle");
const dark = document.querySelectorAll(".dark");
const regions = document.querySelectorAll(".regions");
const icon = document.querySelector(".bx");
const dropDown = document.querySelector(".dropdown");
const dropOptions = document.querySelector(".drop-options");
const countries = document.querySelector(".countries");
const eachCountryDetails = document.querySelector(".the-details");
const search = document.getElementById("search");
const filter = document.querySelector(".filter");


// DARK MODE TOGGLE

toggleIcon.addEventListener("click", (e) => {
  document.body.classList.toggle("dark-mode");
  toggleIcon.classList.toggle("dark-mode");
  icon.classList.toggle("bxs-moon");

//   for the header, search and dropdown background 

  dark.forEach((dark) => {
    dark.classList.toggle("dark-mode-elements");
  });
    
//   for changing the text to light mode 

  if(toggleIcon.innerText === "Dark Mode"){
    toggleIcon.innerText = "Light Mode"
  }else{
    toggleIcon.innerText = "Dark Mode";
  }
});

// DROP DOWN

dropDown.addEventListener("click", (e)=>{
    dropOptions.classList.toggle("show-drop-down")
})


// POPULATE COUNTRIES USING API

const url = "https://restcountries.com/v2/all";

async function getCountryInfo() {
  const rawData = await fetch(url);
  const response = await rawData.json();

    // console.log(response);

  response.forEach((res) => {
    showCountry(res);
  });
}

getCountryInfo();

function showCountry(data){
  const eachCountry = document.createElement("div");
  eachCountry.classList.add("country", "dark");
  eachCountry.innerHTML = `
        <div class="country-flag">
            <img src=${data.flag}>
          </div>
          <div class="country-details">
            <h4 class="countryName">${data.name}</h4>
            <p>Population: <span>${data.population}</span></p>
            <p class="regionName">Region: <span>${data.region}</span></p>
            <p>Capital: <span>${data.capital}</span></p>
          </div>
  `;

  // Add an onclick event to the eachCountry div
  eachCountry.onclick = function () {
    showCountryDetails(data);
  };

  countries.appendChild(eachCountry);
}


// Function to show details for the clicked country
function showCountryDetails(countryData) {

// const languages = countryData.languages
//   .map((language) => language.name)
//   .join(", ");  

    let languages = "N/A"; // Default value if languages are not provided
    if (countryData.languages && Array.isArray(countryData.languages)) {
      languages = countryData.languages
        .map((language) => language.name)
        .join(", ");
    }

      let currencies = "N/A"; // Default value if languages are not provided
      if (countryData.currencies && Array.isArray(countryData.currencies)) {
        currencies = countryData.currencies
          .map((curriency) => curriency.name)
          .join(", ");
      }

       let borders = "N/A"; // Default value if borders are not provided
       if (countryData.borders && Array.isArray(countryData.borders)) {
         borders = countryData.borders.join(",  ");
       }

  // const curriencies = countryData.currencies
  //   .map((curriency) => curriency.name)
  //   .join(", ");  

  // const borders = countryData.borders.join(" ");

  const eachDetails = document.createElement("div");
  eachDetails.classList.add("each-country-details");
  eachDetails.innerHTML = `
  <button class="btn2 dark" id = "backButton"><i class='bx bx-arrow-back'></i>Back</button>
      <div class="main-details">
        <div class="details-img">
          <img src=${countryData.flag}>
        </div>
        <div class="details-text">
          <h3>${countryData.name}</h3>
          <div class="flex-am">
            <div class="first-text">
               <p>Native Name: <span>${countryData.nativeName}</span></p>
               <p>Population: <span>${countryData.population}</span></p>
               <p>Region: <span>${countryData.region}</span></p>
               <p>Sub Region: <span>${countryData.subregion}</span></p>
               <p>Capital: <span>${countryData.capital}</span></p>
            </div>
            <div class="second-text">
               <p>Top Level Domain: <span>${countryData.topLevelDomain}</span></p>
               <p>Curriencies: <span>${currencies}</span></p>
               <p>Language: <span>${languages}</span></p>
            </div>
          </div>
          <p class="border">Border Countries: <span>${borders}</span></p>
        </div>
      </div>
  `;

  // Get a reference to the <body> element
  const body = document.body;

  body.appendChild(eachDetails);

  // Get a reference to the "Back" button
  const backButton = document.getElementById("backButton");

  // Add a click event handler to the "Back" button
  backButton.addEventListener("click", function () {
    // Remove the details div from the DOM
    eachDetails.remove();
  });
}

// FOR THE SEARCH FUNCTIONALITY

const countryName = document.getElementsByClassName('countryName');
search.addEventListener("input", (e)=>{
  Array.from(countryName).forEach((country)=>{
    if(country.innerText.toLowerCase().includes(search.value.toLowerCase())){
      country.parentElement.parentElement.style.display = "grid"
    }else{
       country.parentElement.parentElement.style.display = "none"
    }
  })
});

// FOR THE DROP DOWN

const regionName = document.getElementsByClassName("regionName");
regions.forEach((region) => {
  region.addEventListener("click", (e) => {
    Array.from(regionName).forEach((element) => {
      if (
        element.innerHTML.includes(region.innerText) ||
        region.innerText == "All"
      ) {
        element.parentElement.parentElement.style.display = "grid";

        // I AM SUPRISE BY WHAT I WROTE HERE

        filter.innerText = region.innerText;
      } else {
        element.parentElement.parentElement.style.display = "none";
      }
    });
  });
});