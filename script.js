var Playerdata;
var MatchID;
var request = new XMLHttpRequest();
var ApiKey = 'RGAPI-8f38637d-2708-45e5-99d5-a5d3d737193f';
var proxyurl = "https://cors-anywhere.herokuapp.com/"
var params = new URLSearchParams(window.location.search);
var Summoner = params.get('userName');
 var games = [];


function loadPlayerData(username) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', proxyurl + 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ username +'?api_key=' + ApiKey);  
    request.onload = playerLoadComplete;
    request.send();
}
function loadMatchData(accID) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', proxyurl + 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accID + '?endIndex=25' + '&api_key=' + ApiKey );  
    request.onload = GameLoadComplete;
    request.send();
}
function MatchStatsData(machID) {
    // Reminder: You will be docked points if you don't use your own API Key
    request.open('GET', proxyurl + 'https://na1.api.riotgames.com/lol/match/v4/matches/' + machID + '?api_key=' + ApiKey, false);  
    request.onload = MatchStatsLoadComplete;
    request.send();
}

function callAPI(){
    var params = new URLSearchParams(window.location.search);
        //console.log(params.get('userName'));
        
        var Summoner = params.get('userName');
        var username = Summoner;
        //console.log(username);
        //location.replace = "./Summonerinfo.html"
        loadPlayerData(username);
        //loadMatchData(accID)
        return false;

    }


function playerLoadComplete(evt) {
    Playerdata = JSON.parse(request.responseText);
    console.log(Playerdata);
    
        var accID = Playerdata.accountId
        console.log(accID);
        loadMatchData(accID);
        //return accID;
}

function GameLoadComplete(evt) {
    MatchID = JSON.parse(request.responseText);
    console.log(MatchID);
   
    for (var i = 0; i < 25; i++) {
        games[i] = MatchID.matches[i].gameId;
    }
      games.forEach(MatchStatsData);
      console.log(games);
}

function MatchStatsLoadComplete(evt) {
    var username = params.get('userName').toLowerCase();
    Gamestats = JSON.parse(request.responseText);
    console.log(Gamestats);

    for (var s = 0; s <9; s++){
      var participant = Gamestats.participantIdentities[s].player.summonerName.toLowerCase();
      if (participant == username){
            var participantID = s;
                for(var game = 0; game <25; game++){
                    if(games[game] == Gamestats.gameId){
                        document.getElementById("champImage" + game).innerHTML = 'champID:' + Gamestats.participants[participantID].championId
                        document.getElementById("kills" + game).innerHTML = 'K' + Gamestats.participants[participantID].stats.kills
                        document.getElementById("deaths" + game).innerHTML = '/D' + Gamestats.participants[participantID].stats.deaths
                        document.getElementById("assists" + game).innerHTML = '/A:' + Gamestats.participants[participantID].stats.assists
                        if(Gamestats.participants[participantID].stats.win == true){
                            document.getElementById("result" + game).innerHTML = 'Victory'
                            break;
				        }
                        else{
                             document.getElementById("result" + game).innerHTML = 'Defeat'
                             break;
				        }
					}
				}
               
                
            
            
	        }
	}

    

}