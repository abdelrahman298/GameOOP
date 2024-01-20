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

async function getGameData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "29525b386fmshbbd70683169ededp1d3d6djsnd713d450895d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let api = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=mmorpg&sort-by=release-date",
    options
  );
  //the Game List Data []
  let response = await api.json();
  let game;
  for (let i = 0; i < response.length; i++) {
    let gameData = response[i];
    game = new GamesHome(
      gameData.id,
      gameData.title,
      gameData.thumbnail,
      gameData.short_description,
      gameData.genre,
      gameData.platform
    );
  }
  console.log(game);
  return game;
}

// export function displayGame() {
//   let gameId = document.createElement("div");
//   gameId.classList = "";
// }
