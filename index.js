const display = document.querySelector(".show-it-here");
const clickBtn = document.getElementById("btn");

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const country = `
        <h2 class="title">You are in ${data.city}, ${data.country}</h2>
        `;
      display.insertAdjacentHTML("beforeend", country);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((obj) => {
      //   console.log(obj[0].flag);
      const flag = `
        <p><img class="flag-pic" src="${obj[0].flag}" alt=""></p>
        `;
      display.insertAdjacentHTML("beforeend", flag);
    });
};

// whereAmI(52.508, 13.381);

clickBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const lat = document.getElementById("lat");
  const lng = document.getElementById("long");
  display.innerHTML = "";
  whereAmI(lat.value, lng.value);
});
