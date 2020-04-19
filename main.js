const { Client } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const Braking = new Client();

Braking.on('ready', () => {
  console.log(`Logged in as ${Braking.user.tag}!`);
});

Braking.on("message", msg => {
    if(msg.author.bot) return;
    const args = msg.content.split(/ +/g);
    const cmd = args.shift();
    if (cmd === `${PREFIX}ping`) msg.channel.send("Pong !");

});



Braking.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel){
        member.guild.owner.send(`:wave: ${member.guild.owner.displayName} ! :robot: Je n'arrive pas a fonctionner correctement, Voici donc le problème :point_down: !  \n **"Erreur: Salon de bienvenue introuvable !!"** :robot:`);
        return;
    }
    channel.send(`Welcome to the server, ${member}`);
  });

Braking.login(TOKEN);
Braking.on("error", console.error);
Braking.on("warn", console.warn);