const { Client } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const Braking = new Client();

Braking.on('ready', () => {
  console.log(`Logged in as ${Braking.user.tag}!`);
});

Braking.on('message', msg => {
  
});

Braking.login(TOKEN);