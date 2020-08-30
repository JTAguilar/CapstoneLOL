var Playerdata;
var MatchID;
var request = new XMLHttpRequest();
const ApiKey = 'RGAPI-f43298a0-e3c5-4326-a19a-41cedb525bfc';
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
var params = new URLSearchParams(window.location.search);
var Summoner = params.get('userName');
var games = [];
const filereader = new FileReader();

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
    //function GetchampIMG(file, callback){
    //    request.open('GET', file, true);
    //   request.send(null);
    //}
        

    function callAPI(){
        //console.log("Database Connected")
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
        //console.log(Gamestats);
        // let elem = document.createElement('div');
        for (var s = 0; s <9; s++){
          var participant = Gamestats.participantIdentities[s].player.summonerName.toLowerCase();
          if (participant == username){
                var participantID = s;
                for(var game = 0; game <1; game++){
                    
                //elem.append(tmpl.content.cloneNode(true));
                // document.body.append(elem);

                        if(games[game] == Gamestats.gameId){
                            var winCondition = Gamestats.participants[participantID].stats.win
                            var div = document.getElementById("match");
                            document.getElementById("champImage").innerHTML = 'champID:' + Gamestats.participants[participantID].championId
                            document.getElementById("kills").innerHTML = Gamestats.participants[participantID].stats.kills
                            document.getElementById("deaths").innerHTML = Gamestats.participants[participantID].stats.deaths
                            document.getElementById("assists").innerHTML = Gamestats.participants[participantID].stats.assists
                            document.getElementById("KDARatio").innerHTML = ((Gamestats.participants[participantID].stats.kills + Gamestats.participants[participantID].stats.assists)/Gamestats.participants[participantID].stats.deaths)
                            document.getElementById("Level").innerHTML = Gamestats.participants[participantID].stats.champLevel
                            document.getElementById("CS").innerHTML = Gamestats.participants[participantID].stats.totalMinionsKilled
                            for(players = 0; players < 10; players++){
                                //GetchampIMG('/10.16.1/data/en_US/champion/championFull.json', function(text){
                                    var json = filereader.readAsText('./championFull.json');
                                    console.log(json)
                                    var champim = JSON.parse(json);
                                    console.log(champim)
                                    var champindex = fruits.indexOf(champim);
                                    var champName = champindex.toString();
                                    console.log(champname);
                                    //document.getElementById( "summ" + players ).innerHTML = Gamestats.participantIdentities[players].player.summonerName
                            };
                            if(winCondition == true){
                                document.getElementById("result").innerHTML = 'Victory';
                                div.classList.add('MatchV');
                                break;
				            }
                            else{
                                 document.getElementById("result").innerHTML = 'Defeat'
                                 div.classList.add('MatchD');
                                 break;
				            }
					    }
				}
                }
          }
	    
    };