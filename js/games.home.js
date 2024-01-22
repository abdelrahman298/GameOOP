import { getGameDataDetail } from "./gameDetails.js";

class GamesHome {
  constructor(id, title, thumbnail, short_description, genre, platform) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.short_description = short_description;
    this.genre = genre;
    this.platform = platform;
  }
}
let fullResponse = [];
//! get the Data from Api
export async function getGameDataHomeFromApi(category) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "29525b386fmshbbd70683169ededp1d3d6djsnd713d450895d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let selectedCategory = category;
  let api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${selectedCategory}&sort-by=release-date`,
    options
  );
  // console.log("selectedCategory from getDataHome");
  // console.log(selectedCategory);
  //the Game List Data is Array[]
  let response = await api.json();
  // console.log(response);
  await dividesGameData(response);
  // return response;
  // fullResponse = response;
}
//! display the Data on Page
export async function dividesGameData(responseBack) {
  let response = await responseBack;
  let rowElement = document.getElementById("row");
  let gameAllElementContainer = "";

  let selectedIndex = 0;
  for (let i = 0; i < response.length; i++) {
    let gameData = response[i];

    let game = new GamesHome(
      gameData.id,
      gameData.title,
      gameData.thumbnail,
      gameData.short_description,
      gameData.genre,
      gameData.platform
    );

    let gameElement = `
    <div class="col-sm-6 col-md-4 col-lg-3">
    <div id='mainCardBody' class="card mb-3 border-black main-card-body game" idValue='${game.id}' >
      <div class="img-container p-3">
        <img
          src=${game.thumbnail}
          class="card-img-top w-100"
          alt="image of game"
        />
      </div>
      <div class="card-body">
        <div
          class="card-title text-white d-flex justify-content-between"
        >
          <p id="gameTitle" class="gameTitle">${game.title}</p>
          <p id="gameStatus" class="gameStatus">Free</p>
        </div>
        <p class="card-text text-white text-center">
        ${game.short_description}
        </p>
      </div>
      <div
        class="card-footer text-white d-flex justify-content-between border-top border-black"
      >
        <p class="genre">${game.genre}</p>
        <p class="platform">${game.platform}</p>
      </div>
    </div>
  </div>
    `;
    gameAllElementContainer += gameElement;
    selectedIndex = gameData.id;
    // clickOnGame(selectedIndex);
  }
  rowElement.innerHTML = gameAllElementContainer;

  document.querySelectorAll(".game").forEach((item) => {
    item.addEventListener("click", () => {
      const idValue = item.getAttribute("idValue");
      getGameDataDetail(idValue);
    });
  });
}

//! send the category
let mmorpg = document.getElementById("MMORPG");
let shooter = document.getElementById("SHOOTER");
let sailing = document.getElementById("SAILING");
let permadeath = document.getElementById("PERMADEATH");
let superHero = document.getElementById("SUPERHERO");
let pixel = document.getElementById("PIXEL");

mmorpg.addEventListener("click", async function () {
  console.log(mmorpg.textContent.toLowerCase());
  await getGameDataHomeFromApi(mmorpg.textContent.toLowerCase());
  await dividesGameData();
});
shooter.addEventListener("click", async function () {
  console.log(shooter.textContent.toLowerCase());
  await getGameDataHomeFromApi(shooter.textContent.toLowerCase());
  await dividesGameData();
});
sailing.addEventListener("click", () => {
  console.log(sailing.textContent.toLowerCase());
  getGameDataHomeFromApi(sailing.textContent.toLowerCase());
});
permadeath.addEventListener("click", () => {
  console.log(permadeath.textContent.toLowerCase());
  getGameDataHomeFromApi(permadeath.textContent.toLowerCase());
});
superHero.addEventListener("click", () => {
  console.log(superHero.textContent.toLowerCase());
  getGameDataHomeFromApi(superHero.textContent.toLowerCase());
});
pixel.addEventListener("click", () => {
  console.log(pixel.textContent.toLowerCase());
  getGameDataHomeFromApi(pixel.textContent.toLowerCase());
});
