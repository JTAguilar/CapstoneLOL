<?php

$ composer require mongodb/mongodb

$Playerdata;
$MatchId;
$ApiKey = 'RGAPI-1642ace6-8ca9-4c76-b7a9-682ecd4984e4';
$proxyurl = \'https://cors-anywhere.herokuapp.com/';

$userName = false;
if(isset($_GET['userName'])){
    $userName = $_GET['userName'];
    $loadPlayerData = $proxyurl . 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $userName . $ApiKey
    $playerdata_JSON = file_get_contents($loadPlayerData);
    $playerdata_array = json_decode($playerdata_JSON, true);
}




?>
