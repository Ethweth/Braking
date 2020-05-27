exports.run = (Braking, msg, args) => {
  if(msg.author.id == "599564487703658516"|| msg.author.id == "365581839907291139"){
    msg.reply("Arrêt en cour");
      console.log('/ Je suis désormais offline / ');
      Braking.destroy();
      process.exit()
  } else {
    msg.channel.send("**Erreur** ! Tu n'es pas l'owner")
  }
};

exports.help = {
  name: "logout"
};