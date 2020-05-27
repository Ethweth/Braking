exports.run = (Braking, msg, args) => {
  
  if (msg.author.id != "599564487703658516"){
    msg.delete();
    msg.reply("Nian nian, Tu ne me fera pas dire ce que je ne veux pas !");
  }else {
    msg.delete();
    msg.channel.send(args.join(" "));
  }
  
};

exports.help = {
  name: "say"
};