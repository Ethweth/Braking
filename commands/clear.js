exports.run = async (Braking, msg, args) => {
    
    if (msg.deletable) {
        msg.delete();
    }

    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        return msg.reply("Vous ne pouvez pas supprimer les messages....").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return msg.reply("Yeah.... Ce n'est pas un chiffre? Je ne peux pas non plus supprimer 0 message.").then(m => m.delete(5000));
    }

    if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return msg.reply("Désolé... Je ne peux pas supprimer de messages.").then(m => m.delete(5000));
    }

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    msg.channel.bulkDelete(deleteAmount, true)
        .then(deleted => msg.channel.send(`J'ai effacé \`${deleted.size}\` messages.`))
        .catch(err => msg.reply(`Quelque chose a mal tourné... ${err}`));
   
};


exports.help = {
    name: "clear"
  };