<?php

$ composer require mongodb/mongodb

$Playerdata;
$MatchId;
$ApiKey = 'RGAPI-1642ace6-8ca9-4c76-b7a9-682ecd4984e4';
$proxyurl = \'https://cors-anywhere.herokuapp.com/';

$userName = false;
if(isset($_GET['userName'])){
    $userName = $_GET['userName'];
    $loadPlayerData = $proxyurl . 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $userName . '?api_key=' . $ApiKey
    $playerdata_JSON = file_get_contents($loadPlayerData);
    $playerdata_array = json_decode($playerdata_JSON, true);
    console_log($playerdata_array);
}



function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}
?>





<html>
    <head>
        <link rel="stylesheet" type="text/css" href="styles.css" />
    
    </head>

    <body onload="script.php">

        <div class="search_bar">
        <form id="summonerForm" class="summoner-search-form" action="Summonerinfo.html" </form>
                <input type="text" name="userName" class="summoner-search-form__text" placeholder="Name1, Name2, ...">
                <button type="submit" class="summoner-search-form__button" id="submitButton" >
                Search
                </button>
                <button type="button" class="summoner-search-form__setting" onclick="$.OP.GG.layout.regionLanguage.open();">
                    <span>NA</span>
                </button>
        </div>

        <div id="profileInfo" class="profileInfo">
            <img class="Image" src="icon.jpg">
            <div class="sumName" id="sumName"></div>


        </div>

        <div class="gameList">
                <div  id="match" class="layout">
                    <div id="result" class="results"></div>
                    <div class="gameSettings">
                        <img id="champImage" height="80%" width="80%" />
                    </div>
                    <div id="KDA" class="KDA">
                        <div class="KDA">
                            <span id="kills"></span>/
                            <span id="deaths"></span>/
                            <span id="assists"></span>
                        </div>
                        <div class="KDARatio">KDA: 
                            <span id="KDARatio" class="KDARatio"></span>:1
                        </div>
                    </div>
                    <div class="Stats">
                        <div>Level: <span id="Level"></span></div>
                        <div><span id="CS"></span> CS</div>

                    </div>
                    <div class="players">
                        <div id="team1" class="team">
                            <div class="summoner" id="summ0"></div>
                            <div class="summoner" id="summ1"></div>
                            <div class="summoner" id="summ2"></div>
                            <div class="summoner" id="summ3"></div>
                            <div class="summoner" id="summ4"></div>
                        </div>
                        <div id="team2" class="team">
                            <div class="summoner" id="summ5"></div>
                            <div class="summoner" id="summ6"></div>
                            <div class="summoner" id="summ7"></div>
                            <div class="summoner" id="summ8"></div>
                            <div class="summoner" id="summ9"></div>
                        </div>
                    </div>
                 </div>
        </div>
    </body>
</html>