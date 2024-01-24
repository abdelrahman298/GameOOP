let gameDetailSection = document.getElementById("gameDetailSection");
let header = document.getElementById("header");
let home = document.getElementById("home");

class GameDetails {
  constructor(
    id,
    title,
    thumbnail,
    category,
    platform,
    status,
    description,
    urlLink
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.category = category;
    this.platform = platform;
    this.status = status;
    this.description = description;
    this.urlLink = urlLink;
  }
}

//!   GEt Game of Selected Data from Api //
export async function getGameDataDetail(gameId) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "29525b386fmshbbd70683169ededp1d3d6djsnd713d450895d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
    options
  );
  //the Game List Data is Array[]
  let response = await api.text();
  //? AN object which contains the Game Details
  displayGameDetails(response);
  return;
}

//!  Divides the Data of selected Game !//

async function displayGameDetails(game) {
  let gameObj = game;
  let gameDetailSection = document.getElementById("gameDetailSection");
  let gameDetailContainer = document.getElementById("gameDetailContainer");
  //? ///////////////
  let response = JSON.parse(gameObj);

  let GameDetail = new GameDetails(
    response.id,
    response.title,
    response.thumbnail,
    response.genre,
    response.platform,
    response.status,
    response.description,
    response.game_url
  );
  //? ///////////////
  let gameDetailsElement = `
    <div class="container">
    <div class="hstack d-flex justify-content-between mb-5">
      <h1 class="text-white hstack-text">Details Game</h1>
      <a id="closeBtn" class="text-white-50 hstack-btn" href="#"
        ><i class="fa-solid fa-xmark"></i
      ></a>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <div class="img-container">
          <img
            class="w-100"
            src=${GameDetail.thumbnail}
            alt="Details Image"
          />
        </div>
      </div>
      <div class="col-sm-8">
        <div class="game-details-contents text-white gy-3">
          <h3 class="game-title mb-2">Title:${GameDetail.title}</h3>
          <p>
            Category:
            <span id="gameCategory" class="game-type mb-2">
            ${GameDetail.category}</span
            >
          </p>
          <p>
            Platform:<span id="gamePlatform" class="game-type mb-2">
            ${GameDetail.platform}</span
            >
          </p>
          <p>
            Status:<span id="gameStatus" class="game-type mb-2">
            ${GameDetail.status}</span
            >
          </p>

          <div class="details-desc-container">
            <p class="details-desc">${GameDetail.description}
            </p>
          </div>
          <button id="showGameBtn" class="show-game-btn" >
          <a class='game-link'  href='${GameDetail.urlLink}' target="_blank">  Show Game </a>
          </button>
        </div>
      </div>
    </div>
  </div>

    `;
  //? ///////////////
  gameDetailContainer.innerHTML = gameDetailsElement;
  gameDetailSection.appendChild(gameDetailContainer);
  //? ///////////////
  gameDetailSection.classList.remove("d-none");
  header.classList.add("d-none");
  home.classList.add("d-none");

  console.log(response);
  console.log(response.id);

  let closeBtn = document.getElementById("closeBtn");
  //! close the game Details Tabe !//
  closeBtn.addEventListener("click", function () {
    gameDetailSection.classList.add("d-none");
    header.classList.remove("d-none");
    home.classList.remove("d-none");
  });
}
