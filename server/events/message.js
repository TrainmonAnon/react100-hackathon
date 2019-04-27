const axios = require('axios');
const fs = require('fs');
const url = 'https://esi.evetech.net/latest/';

module.exports = (client, message) => {
    let users = new Array();
    fs.readFile('users.json', (err, data) => {  
        if (err) throw err;
        let d = JSON.parse(data);
        users = d.Users;
    });
    var args = message.content.split(' ');
    var discordID = message.author.id;
    let id = parseInt(args[1]);

    if (args[0] === '!link') {
        let role = message.guild.roles.find(role => role.name === "Connected");
        axios({
            method: 'get',
            headers: {
                'accept': 'application/json'
            },
            data: {
                'datasource':'tranquility'
            },
            url: url + 'characters/' + id + '/'
            
        }).then(response => {
            axios({
                method: 'get',
                headers: {
                    'accept': 'application/json'
                },
                data: {
                    'datasource':'tranquility'
                },
                url: url + 'characters/' + id + '/portrait/'
                
            }).then(response2 => {
                console.log(response2.data.px256x256);
                message.reply(`Welcome to the server: ${response.data.name}`, {files: [response2.data['px256x256']]});
            });
        });
        message.member.addRole(role).catch(console.error);
        users.push({
            DiscordID:discordID,
            EveID:id,
            token:"",
            refresh:""
        });
        fs.writeFile('users.json', JSON.stringify({'Users':users}), (err, result) => {
            if(err) console.log('error', err);
        });
    }
    else if (args[0] ===' !authenticate') {
        message.reply(`Sorry, that's not implemented yet`);
    }
    else if (args[0] === '!pic') {

        axios({
            method: 'get',
            headers: {
                'accept': 'application/json'
            },
            data: {
                'datasource':'tranquility'
            },
            url: url + 'characters/' + id + '/portrait/'
            
        }).then(response => {
            console.log(response.data.px256x256);
            message.reply(`Here's your pic:`, {files: [response.data['px256x256']]});
        });
    }
    else if (args[0] === '!loc') {
        message.reply(`Sorry, that's not implemented yet`);
    }
    else if (args[0] === '!skill') {
        message.reply(`Sorry, that's not implemented yet`);
    }
}