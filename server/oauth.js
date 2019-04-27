require('dotenv').config();
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const app = express();

const eveClientID=process.env.EVE_CLIENT_ID;
const eveSecret=process.env.EVE_SECRET_KEY;
const encode = Buffer.from(`${eveClientID}:${eveSecret}`).toString('base64');
// const response_type = 'code';
// const redirect_uri = 'http://localhost/callback';
// const scope = 'esi-location.read_location.v1';
// const loginUrl = 'https://login.eveonline.com/oauth/authorize/' + response_type + redirect_uri + eveClientID + scope;
const tokenUrl = 'https://login.eveonline.com/oauth/token/';
const verifyUrl = 'https://login.eveonline.com/oauth/verify/';

var code;
var token, rToken;
var eveID, eveName, eveHash, discordID = '';
var users;
fs.readFile('users.json', (err, data) => {  
    if (err) throw err;
    users = JSON.parse(data);
});

function setDiscordID(id){
    discordID = id;
}

app.get('/callback', (request, res) => {
    console.log(request.query);
    code = request.query.code;
    console.log('Code: ' + code);
    res.send(encode);
    if (code){
        console.log('test');
        axios({
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Basic ' + encode
            },
            data: {
                'grant_type':'authorization_code',
                'code':code
            },
            url: tokenUrl
            
        }).then(data => {
            token = data['access_token'];
            rToken = data['refresh_token'];
            res.send(token);
            console.log('Token: ' + token);

            axios({
                method: 'post', //you can set what request you want to be
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                url: verifyUrl
            }).then(vData=> {
                eveID = vData['eveacterID'];
                eveName = vData['eveacterName'];
                eveHash = vData['eveacterOwnerHash'];
                console.log('EveID: ' + eveID);
                users.users.push({
                    discordID: discordID,
                    eveID: eveID,
                    eveName: eveName,
                    eveHash: eveHash,
                    token: token,
                    refresh: rToken
                });
                fs.writeFile('./users.json', users);
            }).catch((error) => {
                console.log('error');
            });
        }).catch((error) => {
            console.log(error);
        });
    }
});
app.listen(8080, () => console.log(`Eve Authentication app listening on port 8080!`))

module.exports.setDiscordID = setDiscordID;