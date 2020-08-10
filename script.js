var Playerdata;
var MatchID;
var request = new XMLHttpRequest();
var ApiKey = 'RGAPI-e91cd72c-1b2c-49a6-880b-aaba62f668d4';
var Summoner = document.getElementById("summonerForm");



function loadPlayerData(username) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ username +'?api_key=' + ApiKey);  
    request.onload = playerLoadComplete;
    request.send();
}
function loadMatchData(accID) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accID + '?endIndex=25' + '&api_key=' + ApiKey );  
    request.onload = GameLoadComplete;
    request.send();
}
function MatchStatsLoadComplete(machID) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', 'https://na1.api.riotgames.com/lol/match/v4/matches/' + machID + '?api_key=' + ApiKey );  
    request.onload = GameLoadComplete;
    request.send();
}

Summoner.onSubmit = function(){
        var username = Summoner["username"].value;
        // console.log(username);
        location.href("Summonerinfo.html")
        loadPlayerData(username);
        loadMatchData(accID)
        return false;

    }

function playerLoadComplete(evt) {
    Playerdata = JSON.parse(request.responseText);
    console.log(Playerdata);
    
        var accID = Playerdata.accountID   

}

function GameLoadComplete(evt) {
    MatchID = JSON.parse(request.responseText);
    console.log(MatchID);

    for (var i = 0; i < 25; i++) {
        var machID = MatchID[i].gameID
        MatchStatsLoadComplete(machID)
    }
}

function MatchStatsLoadComplete(evt) {
    Gamestats = JSON.parse(request.responseText);
    //console.log(Gamestats);

    for (var i = 0; i <9; i++){
      var participant = Gamestats.participantIdentities[i].player.summonerName
      if (participant == username){
            var participantID = i;
	  }
	}
    for (var i = 0; i < 5; i++) {
        document.getElementById("place" + i).innerHTML = 'Victory:' + Gamestats.participants[participantID].stats.win
        document.getElementById("champImage" + i).innerHTML = 'champID:' + Gamestats.participants[participantID].championId
        document.getElementById("kills" + i).innerHTML = 'Kills:' + Gamestats.participants[participantID].stats.kills
        document.getElementById("deaths" + i).innerHTML = 'Deaths:' + Gamestats.participants[participantID].stats.deaths
        document.getElementById("assists" + i).innerHTML = 'Assists:' + Gamestats.participants[participantID].stats.assists
    }

    

}