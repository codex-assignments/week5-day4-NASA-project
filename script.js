"use strict";

const form = document.getElementById("date");
const dateInput = document.getElementById("inputDate");
const statusDiv = document.getElementById("status");
const resultsDiv = document.getElementById("results");

function setStatus(message, isError) {
  statusDiv.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = message;

  if (isError) {
    p.classList.add("bg-red-300");
    p.classList.remove("bg-green-300");
  } else {
    p.classList.add("bg-green-300");
    p.classList.remove("bg-red-300");
  }

  statusDiv.appendChild(p);
}

// build the url with parameters

function buildAPODURL(date, apiKey) {
  const base = "https://api.nasa.gov/planetary/apod";
  const keyParam = "api_key=" + apiKey;
  const dateParam = "date=" + date;
  return base + "?" + keyParam + "&" + dateParam;
}

// Retrieve the data from API with fetch function

async function fetchNasaData(url) {
  try {
    setStatus("Loading...", false);
    const res = await fetch(url);
    if (!res.ok) {
      setStatus("Error getting data", true);
      return;
    }
    const data = await res.json();
    setStatus("Success!");
    return data;
  } catch (error) {
    setStatus("Error: " + error.message, true);
    console.log(error);
  }
}

// pass in the API key

async function keyApiKey() {
    try {
        const option = { method: "POST" };
        const res = await fetch("https://proxy-key-0udy.onrender.com/get-key2", option);
        if (!res.ok) {
            throw new Error("Couldn't get key")
        }
        const data = await res.json()
        return data

    } catch (error) {
        console.log("Error:", error.message)
    }
}


// render results on page

function render(nasaData) {
  resultsDiv.innerHTML = "";
  const h2 = document.createElement("h2");
  h2.textContent = nasaData.title;

  const dateP = document.createElement("p");
  dateP.textContent = nasaData.date;
  const explanationP = document.createElement("p");
  explanationP.textContent = nasaData.explanation;

  const img = document.createElement("img");
  img.src = nasaData.url;
  img.alt = nasaData.title;

  resultsDiv.appendChild(h2);
  resultsDiv.appendChild(dateP);
  resultsDiv.appendChild(explanationP);
  resultsDiv.appendChild(img);
}

// run function

async function run() {
  try {
      const date = inputDate.value;
      const API_KEY = await keyApiKey();
    const url = buildAPODURL(date, API_KEY.key);

      const nasaData = await fetchNasaData(url);
      render(nasaData);
    console.log(nasaData);
  } catch (error) {
    console.log(error);
  }
}

// main function

async function main() {
  setStatus("Enter a date and click Search.", false);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Submitting form");
    await run();
  });
}

main();
