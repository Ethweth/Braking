const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = async (Braking, member) => {
    const settings = await Braking.getGuild(member.guild);
    const channel = member.guild.channels.cache.find(ch => ch.name === settings.welcomeChannel);
    if (!channel){
        member.guild.owner.send(`:wave: ${member.guild.owner.displayName} ! :robot: Je n'arrive pas à fonctionner correctement, Voici donc le problème :point_down: !  \n **"Erreur : Salon de bienvenue introuvable !!"** :robot: \n Paramètre le en exécutant 'B?config welcomeChannel {Nom exact}'* `);
        return;
    }
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
            let fontSize = 70;
            do {
                ctx.font = `${fontSize -= 10}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            return ctx.font;
        };
        
            const canvas = Canvas.createCanvas(800, 300);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('assets/welcome-image-vierge.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#161b28";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
       
            ctx.font = '23px sans-serif';
            ctx.fillStyle = '#8BCCE9';
            ctx.fillText(`${member.guild.memberCount}`, 327, 234);
        
            ctx.font = '46px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${member.user.tag}`, 356, 159);
        
            ctx.beginPath();
            ctx.arc(170, 148, 127, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 16, -2, 300, 300);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image-.png');
    
            channel.send(attachment);
};