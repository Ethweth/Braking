const { MessageEmbed } = require('discord.js');

exports.run = (Braking, msg) => {
  const embed = new MessageEmbed()
  .setDescription(msg.guild.name)
  .setThumbnail(msg.guild.iconURL())
  .setColor("#04B4AE")
  .addField("**Créateur**", msg.guild.owner.user.tag, true)
  .addField("**Membres**", msg.guild.memberCount, true)
  .addField("**Role Count**", `${msg.guild.roles.size}`, true)
  .addField("**Régions**", msg.guild.region, true)
  .addField("**Channel AFK**", msg.guild.afkChannel, true)
  .addField("**VerificationLVL**", msg.guild.verificationLevel, true)
  .setFooter("@Braking 2018-2020", Braking.user.displayAvatarURL)
  .setTimestamp();
msg.channel.send(embed);
};

exports.help = {
  name: "sinfo"
};