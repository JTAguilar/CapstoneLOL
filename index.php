<?php
$servername = 'localhost';
$username = 'Admin';
$password = 'Bubbletoaster23~';

$conn = new mysqli($servername, $username, $password);

if($conn->connect_error) {
	die("connection failed: " . $conn->connect_error);
}
echo "Connected Succesfully";

$sql = "Create Database myDB";
if ($conn->query($sql) === TRUE) {
	echo "Database created Succesfully";
} else {
	echo "Error Creating Databse: " .$conn->error;
}

$conn->close();
?>



<html>
<head>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <script src="DB.js"></script>
</head>

<body>
    <h1>Hello and welcome to this page. Don't worry its a work in progress.</h1>
    <div class="l-container">            
        <div class="index-logo">
                <iframe src="https://giphy.com/embed/RGdfSa7X0OIQzGPfjZ" title="Fine" alt="This is fine" class="Image"></iframe>
        </div>
    
        <form id="summonerForm" class="summoner-search-form" action="Summonerinfo.html" </form>
        <input type="text" name="userName" class="summoner-search-form__text" placeholder="Name1, Name2, ...">
        <button type="submit" class="summoner-search-form__button" id="submitButton" >
        Search
        </button>
        <button type="button" class="summoner-search-form__setting" onclick="$.OP.GG.layout.regionLanguage.open();">
            <span>NA</span>
        </button>
        
    </div>
</body>4

</html>