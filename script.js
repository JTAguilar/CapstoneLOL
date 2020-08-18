var Playerdata;
var MatchID;
var request = new XMLHttpRequest();
var ApiKey = 'RGAPI-50378d6a-5104-4225-8a7c-15e30e6743b0';
var proxyurl = "https://cors-anywhere.herokuapp.com/"
var params = new URLSearchParams(window.location.search);
var Summoner = params.get('userName');
 var games = [];


function loadPlayerData(username) {
    
    request.open('GET', proxyurl + 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ username +'?api_key=' + ApiKey);  
    request.onload = playerLoadComplete;
    request.send();
}
function loadMatchData(accID) {
    
    request.open('GET', proxyurl + 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accID + '?endIndex=25' + '&api_key=' + ApiKey , false);  
    request.onload = GameLoadComplete;
    request.send();
}
function MatchStatsData(machID) {
    
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
        document.getElementById("sumName").innerHTML = Playerdata.name;
        var accID = Playerdata.accountId
        //console.log(accID);
        loadMatchData(accID);
        //return accID;
}

function GameLoadComplete(evt) {
    MatchID = JSON.parse(request.responseText);
    //console.log(MatchID);
   
    for (var i = 0; i < 25; i++) {
        games[i] = MatchID.matches[i].gameId;
    }
      games.forEach(MatchStatsData);
      //console.log(games);
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
                    var winCondition = Gamestats.participants[participantID].stats.win
                    var div = document.getElementById("match" + game);
                        document.getElementById("champImage" + game).innerHTML = 'champID:' + Gamestats.participants[participantID].championId
                        document.getElementById("kills" + game).innerHTML = Gamestats.participants[participantID].stats.kills
                        document.getElementById("deaths" + game).innerHTML = Gamestats.participants[participantID].stats.deaths
                        document.getElementById("assists" + game).innerHTML = Gamestats.participants[participantID].stats.assists
                        document.getElementById("KDARatio" + game).innerHTML = ((Gamestats.participants[participantID].stats.kills + Gamestats.participants[participantID].stats.assists)/Gamestats.participants[participantID].stats.deaths)
                        document.getElementById("Level" + game).innerHTML = Gamestats.participants[participantID].stats.champLevel
                        document.getElementById("CS" + game).innerHTML = Gamestats.participants[participantID].stats.totalMinionsKilled
                        for(players = 0; players < 10; players++){
                        document.getElementById("summ" + game + players).innerHTML = Gamestats.participantIdentities[players].player.summonerName
                        }
                        if(winCondition == true){
                            document.getElementById("result" + game).innerHTML = 'Victory';
                            div.classList.add('MatchV');
                            break;
				        }
                        else{
                             document.getElementById("result" + game).innerHTML = 'Defeat'
                             div.classList.add('MatchD');
                             break;
				        }
					}
				}
               
                
            
            
	        }
	}

    

}