class GamesHome {
  constructor(id, title, thumbnail, short_description, genre, platform) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.short_description = short_description;
    this.genre = genre;
    this.platform = platform;
  }

  //الكود هنا خطأ بسبب انى لازم الأول اسحب ال
  //constructor
  // من الكلاس اللى اسمه
  //dividesGameData

  // dividesGameData(id, title, thumbnail, short_description, genre, platform) {
  //   let gameElement = `
  //   <div class="col-sm-6 col-md-4 col-lg-3">
  //   <div class="card mb-3 border-black main-card-body">
  //     <div class="img-container p-3">
  //       <img
  //         src="${thumbnail}"
  //         class="card-img-top w-100"
  //         alt="image of game"
  //       />
  //     </div>
  //     <div class="card-body">
  //       <div
  //         class="card-title text-white d-flex justify-content-between"
  //       >
  //         <p id="gameTitle" class="gameTitle">${title}</p>
  //         <p id="gameStatus" class="gameStatus">Free</p>
  //       </div>
  //       <p class="card-text text-white text-center">
  //       ${short_description}
  //       </p>
  //     </div>
  //     <div
  //       class="card-footer text-white d-flex justify-content-between border-top border-black"
  //     >
  //       <p class="genre">${genre}</p>
  //       <p class="platform">${platform}</p>
  //     </div>
  //   </div>
  // </div>
  //   `;

  //   let rowElement = document.getElementById("row");
  //   rowElement.append(gameElement);
  // }
}

export async function getGameDataHomeFromApi() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "29525b386fmshbbd70683169ededp1d3d6djsnd713d450895d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let api = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=MMORPG&sort-by=release-date",
    options
  );
  //the Game List Data is Array[]
  let response = await api.json();

  return response;
}

export async function dividesGameData() {
  let response = await getGameDataHomeFromApi();
  let rowElement = document.getElementById("row");
  let gameAllElementContainer = "";

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
    <div class="card mb-3 border-black main-card-body">
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
  }
  rowElement.innerHTML = gameAllElementContainer;
}
