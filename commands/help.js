const Discord = require('discord.js');

exports.run = (Braking, msg) => {

    const embed = new Discord.MessageEmbed()
    .setThumbnail(Braking.user.avatarURL)
    .setColor("#4B63EC")
    .setTitle(`Braking » Page d'aide\n\nSalut ${msg.author.username}! Je suis Braking, un bot comme les autres, créé par Ethweth#1371.\n\n                                                               ⌠ Catégories ⌡`)
    .setDescription(`:gear: » Modération
                     :gear: » Paramètres
                     :gear: » Économie
                     :gear: » Utilitaires`);

msg.channel.send(embed).then(async (msg) => {
msg.react('👍').then(() => msg.react('👎'));
    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

const collector = msg.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));  
    

    // if ( === '👍') {
    //     msg.reply("dgfegzee");
    //     console.log("tegzegez");
    // } else if ( === ('👎')){
    //     msg.reply("Nop");
    // }
    
});



};

exports.help = {
    name: "help"
};