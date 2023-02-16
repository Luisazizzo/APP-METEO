import { GET } from "./api.js";

const searchEl = document.querySelector("#search");
const containerCardEl = document.querySelector(".container");

const weekDay = (data) => {
  const day = new Date(data);
  switch (day.getDay()) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    default:
      return "error";
  }
};
const monthString = (month) => {
  const mese = new Date(month);
  switch (mese.getMonth() + 1) {
    case 13:
      return "january";
    case 1:
      return "february";
    case 2:
      return "march";
    case 3:
      return "april";
    case 4:
      return "may";
    case 5:
      return "june";
    case 6:
      return "july";
    case 7:
      return "august";
    case 8:
      return "september";
    case 9:
      return "october";
    case 10:
      return "november";
    case 11:
      return "december";
    default:
      return "error";
  }
};

const date = (data) => {
  const giorno = new Date(data);
  return giorno.getDate();
};

const anno = (anno) => {
  const year = new Date(anno);
  return year.getFullYear();
};

const createCard = (item) => {
  containerCardEl.innerHTML = "";
  const cardEl = document.createElement("div");
  cardEl.className = "card";
  const cityEl = document.createElement("h2");
  cityEl.textContent = item.location.name;
  const regionEl = document.createElement("h3");
  regionEl.textContent = `${item.location.region}, ${item.location.country}`;
  const dateEl = document.createElement("h4");
  dateEl.textContent = `${weekDay(
    item.location.localtime_epoch
  )}, ${monthString(item.location.localtime_epoch)} ${date(
    item.location.localtime_epoch
  )}, ${anno(item.location.localtime_epoch)}`;
  const tempEl = document.createElement("h1");
  tempEl.textContent = `${item.current.temp_c}°c`;
  const imgConditionEl = document.createElement("img");
  imgConditionEl.setAttribute("src", item.current.condition.icon);
  const conditionEl = document.createElement("h5");
  conditionEl.textContent = item.current.condition.text;
  const wrapperEl = document.createElement("div");
  wrapperEl.className = "wrapper";
  wrapperEl.innerHTML = `<div class="icons">
  <img src="./vento.png" alt="vento"/>
  <p class="description">${item.current.wind_kph} km/h</p>
  <p class="ciao">Wind</p>
  </div>
  <div class="icons">
  <img src="./umidita.png" alt="umidità"/>
  <p class="description">${item.current.humidity} %</p>
  <p class="ciao">Humidity</p>
  </div>
  <div class="icons">
  <img src="./pressione.png" alt="pressione"/>
  <p class="description">${item.current.pressure_in} atm</p>
  <p class="ciao">Pressure</p>
  </div>`;

  cardEl.append(
    cityEl,
    regionEl,
    dateEl,
    tempEl,
    imgConditionEl,
    conditionEl,
    wrapperEl
  );
  return cardEl;
};

searchEl.addEventListener("submit", (e) => {
  e.preventDefault();
  GET(e.target[0].value).then((data) => {
    searchEl.reset();
    if (data.error) {
      alert("Città non trovata");
    } else {
      containerCardEl.appendChild(createCard(data));
    }
  });
});
