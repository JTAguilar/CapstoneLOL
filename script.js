//const {MongoClient} = require('mongodb');

var Playerdata;
var MatchID;
var request = new XMLHttpRequest();
const ApiKey = "RGAPI-9845e603-0e8c-4af5-a3b3-c1913c7e26f1";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
var params = new URLSearchParams(window.location.search);
var Summoner = params.get("userName");
var games = [];

//connection URL
// const mongourl = "mongodb://localhost:27017";

// const dbName = "LOLCapstone";

/*MongoClient.connect(url, function(err, client) {
    
    console.log("Connected correctly to server");

    const db1 = client.db(dbName);
    

    try{
        db1.collection("SummNames").find(Summoner);
    }catch{
        loadPlayerData(Summoner);
        Playerdata = JSON.parse(request.responseText);
        const sumNameInfo = {
            name: Summoner,
            data: Playerdata
        }
        db1.collection("SummNames").insetOne(sumNameInfo);
        console.log(sumNameInfo);
    }



    client.close();
});*/

function loadPlayerData(username) {
  request.open(
    "GET",
    proxyurl +
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      username +
      "?api_key=" +
      ApiKey
  );
  request.onload = playerLoadComplete;
  request.send();
}
function loadMatchData(accID) {
  request.open(
    "GET",
    proxyurl +
      "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" +
      accID +
      "?endIndex=10" +
      "&api_key=" +
      ApiKey,
    false
  );
  request.onload = GameLoadComplete;
  request.send();
}
function MatchStatsData(machID) {
  request.open(
    "GET",
    proxyurl +
      "https://na1.api.riotgames.com/lol/match/v4/matches/" +
      machID +
      "?api_key=" +
      ApiKey,
    false
  );
  request.onload = MatchStatsLoadComplete;
  request.send();
}
function GetchampIMG() {
  request.open(
    "GET",
    "http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/championFull.json",
    false
  );
  request.onload = console.log("done");
  request.send();
}

function callAPI() {
  var params = new URLSearchParams(window.location.search);
  //console.log(params.get('userName'));

  var Summoner = params.get("userName");
  var username = Summoner;
  //console.log(username);
  //location.replace = "./Summonerinfo.html"
  loadPlayerData(username);
  //loadMatchData(accID)
  return false;
}

function playerLoadComplete(evt) {
  Playerdata = JSON.parse(request.responseText);
  //console.log(Playerdata);
  document.getElementById("sumName").innerHTML = Playerdata.name;
  var accID = Playerdata.accountId;
  var iconId = Playerdata.profileIconId;
  document.getElementById("summIcon").src =
    "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" +
    iconId +
    ".png";
  //console.log(accID);
  loadMatchData(accID);
  //return accID;
}

function GameLoadComplete(evt) {
  MatchID = JSON.parse(request.responseText);
  //console.log(MatchID);

  for (var i = 0; i < 10; i++) {
    games[i] = MatchID.matches[i].gameId;
  }
  games.forEach(MatchStatsData);
  //console.log(games);
}

function MatchStatsLoadComplete(evt) {
  var username = params.get("userName").toLowerCase();
  Gamestats = JSON.parse(request.responseText);
  GetchampIMG();
  ChampID = JSON.parse(request.responseText);
  //console.log(ChampID);
  //console.log(Gamestats);

  for (var s = 0; s < 9; s++) {
    var participant = Gamestats.participantIdentities[
      s
    ].player.summonerName.toLowerCase();
    if (participant == username) {
      var participantID = s;
      var div = document.getElementById("gameList");
      //for (var game = 0; game < 25; game++) {
      //elem.append(tmpl.content.cloneNode(true));
      // document.body.append(elem);

      //if (games[game] == Gamestats.gameId) {
      var winCondition = Gamestats.participants[participantID].stats.win;

      var matchDiv = document.createElement("div");
      matchDiv.className = "layout";
      var resultsDiv = document.createElement("div");
      if (winCondition == true) {
        matchDiv.className = "MatchV";
        resultsDiv.innerHTML = "Victory";
      } else {
        matchDiv.className = "MatchD";
        resultsDiv.innerHTML = "Defeat";
      }
      resultsDiv.className = "results";

      var imgDiv = document.createElement("div");
      imgDiv.className = "imgDiv";
      var img = document.createElement("img");
      var userChampId = Gamestats.participants[participantID].championId;
      var userChampName = ChampID.keys[userChampId];
      img.src =
        "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/" +
        userChampName +
        ".png";
      img.id = "champImage";
      img.className = "champImage";
      imgDiv.appendChild(img);

      var kdaDiv = document.createElement("div");
      kdaDiv.className = "kda";
      var KDADiv = document.createElement("div");
      KDADiv.className = "KDA";
      var KSpan = document.createElement("span");
      KSpan.innerHTML =
        "KDA: " + Gamestats.participants[participantID].stats.kills;
      var DSpan = document.createElement("span");
      DSpan.innerHTML =
        "/" + Gamestats.participants[participantID].stats.deaths;
      var ASpan = document.createElement("span");
      ASpan.innerHTML =
        "/" + Gamestats.participants[participantID].stats.assists;
      KDADiv.appendChild(KSpan);
      KDADiv.appendChild(DSpan);
      KDADiv.appendChild(ASpan);
      kdaDiv.appendChild(KDADiv);
      var kdaRatDiv = document.createElement("div");
      kdaRatDiv.className = "KDARatio";
      var kdaRatSpan = document.createElement("span");
      kdaRatSpan.innerHTML =
        Math.ceil(
          ((Gamestats.participants[participantID].stats.kills +
            Gamestats.participants[participantID].stats.assists) /
            Gamestats.participants[participantID].stats.deaths) *
            10
        ) /
          10 +
        ":1";
      kdaRatSpan.className = "KDARatio";
      kdaRatDiv.appendChild(kdaRatSpan);
      kdaDiv.appendChild(kdaRatDiv);

      var statsDiv = document.createElement("div");
      statsDiv.className = "Stats";
      var levelDiv = document.createElement("div");
      var levelSpan = document.createElement("span");
      levelSpan.innerHTML =
        "Level: " + Gamestats.participants[participantID].stats.champLevel;
      levelDiv.appendChild(levelSpan);
      var csDiv = document.createElement("div");
      var csSpan = document.createElement("span");
      csSpan.innerHTML =
        "CS: " + Gamestats.participants[participantID].stats.totalMinionsKilled;
      csDiv.appendChild(csSpan);
      statsDiv.appendChild(levelDiv);
      statsDiv.appendChild(csDiv);

      var teamsDiv = document.createElement("div");
      teamsDiv.className = "teamsList";
      for (let t = 0; t < 2; t++) {
        var teamDiv = document.createElement("div");
        teamDiv.className = "team";
        for (let p = 0; p < 5; p++) {
          var playerDiv = document.createElement("div");
          playerDiv.className = "summoner";
          var champLink = document.createElement("a");
          champLink.target = "_blank"
          var playerChampImg = document.createElement("img");
          playerChampImg.className = "champImageList";
          var playerSummNameSpan = document.createElement("span");
          playerSummNameSpan.className = "summonerName";
          var championID = Gamestats.participants[5 * t + p].championId;
          var championName = ChampID.keys[championID];
          playerChampImg.src =
            "http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/" +
            championName +
            ".png";
          champLink.href = 'https://na.leagueoflegends.com/en-us/champions/' + championName.toLowerCase();
          playerSummNameSpan.innerHTML =
            Gamestats.participantIdentities[5 * t + p].player.summonerName;

          champLink.appendChild(playerChampImg);
          playerDiv.appendChild(champLink);
          playerDiv.appendChild(playerSummNameSpan);
          teamDiv.appendChild(playerDiv);
        }
        teamsDiv.appendChild(teamDiv);
      }

      matchDiv.appendChild(resultsDiv);
      matchDiv.appendChild(imgDiv);
      matchDiv.appendChild(kdaDiv);
      matchDiv.appendChild(statsDiv);
      matchDiv.appendChild(teamsDiv);

      div.appendChild(matchDiv);
      //}
      //}
    }
  }
}
