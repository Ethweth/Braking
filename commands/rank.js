const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (Braking, msg) => {
const applyText = (canvas, text) => {
const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

	const canvas = Canvas.createCanvas(934, 282);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('assets/rank-viege-2.png');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "#161b28";
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '30px sans-serif';
	ctx.fillStyle = '#ffffff';
    ctx.fillText(`${msg.author.tag}`, 289, 145);

	ctx.beginPath();
	ctx.arc(562, 159, 47, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
    
    const avatar = await Canvas.loadImage(msg.member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 513, 110, 98, 98);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank-card.png');

	msg.channel.send(attachment);
	msg.delete({ timeout: 3000});

};

exports.help = {
	name: "rank"
  };