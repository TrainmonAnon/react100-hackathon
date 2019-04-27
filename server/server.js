require('dotenv').config();
const cron = require("node-cron");
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const esi = require('eve-swagger');
const esi2 = esi({
    service: 'https://esi.tech.ccp.is',
    source: 'tranquility',
    language: 'en-us',
    timeout: 6000,
    minTime: 0,
    maxConcurrent: 0
});

fs.readdir('./server/events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});
client.login(process.env.BOT_TOKEN);