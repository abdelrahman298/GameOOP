export async function getGameDataDetail(gameId = 452) {
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
  console.log(response);
  //? AN object which contains the Game Details
  return response;
}
