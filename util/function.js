const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = Braking => {

  module.exports = {
    getMember: function(msg, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = msg.guild.members.get(toFind);
        
        if (!target && msg.mentions.members)
            target = msg.mentions.members.first();

        if (!target && toFind) {
            target = msg.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = msg.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptmsg: async function (msg, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await msg.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return msg
            .awaitReactions(filter, { max: 2, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    }
};








  Braking.updateGuild = async (guild, settings) => {
    let data = await Braking.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  
  Braking.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return Braking.config.defaultSettings;
  };  
  
  
  Braking.createGuild = async settings => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, settings);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`New guild -> ${g.guildName}.`));
  };

};