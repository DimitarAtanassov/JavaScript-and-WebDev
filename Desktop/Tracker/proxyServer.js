//Setting up all the things we will use for our Proxy Server
var express = require('express');
var cors = require('cors');
const axios = require('axios');
const { response } = require('express');

var app = express();    //Constructor

app.use(cors());

const API_KEY = "RGAPI-770fd754-c8ab-4675-b625-ea0534b3992c";

function getPlayerPUUID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
        .then(response => {
            return response.data.puuid
        }).catch(err => err);
}

//GET request to get the past 5 games of the user
//localhost:4000/past5Games
app.get('/past5games', async (req, res) => {
    const playerName = req.query.username;
    //PUUID
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    var matchDataArray = [];
    for (var i = 0; i < gameIDs.length - 15; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }
    res.json(matchDataArray);

});
//Get request to get Player data (Summoners are the players)
//localhost:4000/summData
app.get('/summonerData', async (req, res) => {
    const userName = req.query.username;
    const API_CALL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + userName + "?api_key=" + API_KEY;
    const playerData = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    res.json(playerData);
    const playerID = playerData.id;
})
app.get('/winLoss', async (req, res) => {
    var playerID = req.query.username;
    const API_Call = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + playerID + "?api_key=" + API_KEY;
    const data = await axios.get(API_Call)
        .then(response => response.data)
        .catch(err => err)
    console.log(data);
    res.json(data);
})



app.listen(4000, function () {
    console.log("Server started on port 4000");
});