This is a project for the React100 Hackathon, where after a user authenticates with EVE Online's server, they can make queries about their account from a discord channel with the EVEBot in it, which will interpret the request and query the EVE api for them.
How to start: 
First begin by cloning this repository, cd into the project in bash and run 'npm install'. 
Then you need to get a copy of the .env file so you can have the Discord bot and Eve client keys. Once you have those you need to start up the Discord bot with 'node server/server.js', then the EVE authentication (Work in Progress) with 'node server/oauth.js', and finally the webpage with 'npm start'. 
You can either proceed directly to the discord channel if you're already connected, or get an invite by clicking the 'Connect' button from the Discord widget on the 'localhost:3000' webpage. 
From there, you can type in '!link {EVEID}' where EVEID is your EVE Online character ID, to link your Discord ID with your EVE character, and the bot will grant you a 'Connected' role, and welcoming you by your Eve character name and profile picture.
You will eventually be able to make authenticated requests, where by clicking the EVE Login button on the webpage will let you give the program permission to request private character information such as location and skill queue waits.