const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

exports.run = async (Braking, msg, args) => {
    msg.delete({ timeout: 3000});

 if (args[0] === "cat") {
     const cat = await fetch("http://aws.random.cat/meow")
     .then(res => res.json())
     .then(json => json.file);

     const embed = new MessageEmbed()
        .setColor('#04B4AE')
        .setImage(cat)
        .setFooter("@Braking 2018-2020", Braking.user.displayAvatarURL)
        .setTimestamp();
    msg.channel.send(embed);
 } else if (args[0] === "dog") {
    const dog = await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(json => json.message);

    const embed = new MessageEmbed()
       .setColor('#04B4AE')
       .setImage(dog)
       .setFooter("@Braking 2018-2020", Braking.user.displayAvatarURL)
       .setTimestamp();
   msg.channel.send(embed);
} else if (args[0] === "fox") {
    const fox = await fetch("https://randomfox.ca/floof/")
    .then(res => res.json())
    .then(json => json.image);

    const embed = new MessageEmbed()
       .setColor('#04B4AE')
       .setImage(fox)
       .setFooter("@Braking 2018-2020", Braking.user.displayAvatarURL)
       .setTimestamp();
   msg.channel.send(embed);
} else {
    msg.delete();
    msg.reply(":x: Désolé, voici la liste des commandes animals disponible :arrow_right: **cat, dog, fox**");
}

};

exports.help = {
  name: "animals"
};