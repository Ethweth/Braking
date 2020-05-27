const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptmsg } = require("../util/function.js");

exports.run = async (Braking, msg, args) => {

    const settings = await Braking.getGuild(msg.member.guild);
    const logChannel = msg.member.guild.channels.cache.find(ch => ch.name === settings.welcomeChannel);

        if (msg.deletable) msg.delete();

        // No args
        if (!args[0]) {
            return msg.reply("Veuillez fournir une personne à bannir.")
                .then(m => m.delete({ timeout: 5000}));
        }

        // No reason
        if (!args[1]) {
            return msg.reply("Veuillez fournir une raison de ban.")
                .then(m => m.delete({ timeout: 5000}));
        }

        // No author permissions
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            return msg.reply("❌ Vous n'êtes pas autorisé à ban les membres. Veuillez contacter un membre du personnel")
                .then(m => m.delete({ timeout: 5000}));
        
        }
        // No bot permissions
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) {
            return msg.member.guild.owner.send(`:wave: ${msg.member.guild.owner.displayName} ! :robot: Je n'arrive pas a fonctionner correctement, Voici donc le problème :point_down: !  \n **"Erreur: Permission [BAN_MEMBER] manquante !!"** :robot:`);
        }

        const toBan = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return msg.reply("Impossible de trouver ce membre, réessayez")
                .then(m => m.delete({ timeout: 5000}));
        }

        // Can't ban urself
        if (toBan.id === msg.author.id) {
            return msg.reply("Vous ne pouvez pas vous bannir ...")
                .then(m => m.delete({ timeout: 5000}));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return msg.reply("Je ne peux pas bannir cette personne en raison de la hiérarchie des rôles, je suppose.")
                .then(m => m.delete({ timeout: 5000}));
        }
        
        const embed = new MessageEmbed()
            .setColor("#04B4AE")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(msg.member.displayName, msg.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> baned member:** ${toBan} (${toBan.id})
            **> baned by:** ${msg.member} (${msg.member.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Cette vérification devient invalide après 30s.`)
            .setDescription(`Voulez-vous bannir ${toBan}?`)

        // Send message
        await msg.channel.send(promptEmbed).then(async msg => {
            // Attente des reactios
            const emoji = await promptmsg(msg, msg.author, 10, ["✅"]);
            // console.log(emgi.reaction.member.last())

            // Verification
            if (emoji.client.emoji.cache.has("✅")) {
                msg.delete();
                console.log("Approuvé");
                console.log(emoji.client);

                // toBan.ban(args.slice(1).join(" "))
                //     .catch(err => {
                //         if (err) return msg.channel.send(`Eh bien ... le ban n'a pas fonctionné. Voici l'erreur ${err}`)
                //     });

                // logChannel.send(embed);
            
            } else {
                msg.delete();
                console.log("Annulé");

                msg.reply(`ban annulée.`)
                    .then(m => m.delete({ timeout: 10000}));
                }
        });

};

exports.help = {
    name: "ban"
  };