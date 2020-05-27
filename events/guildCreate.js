module.exports = async (Braking, guild) => {
    const newGuild = {
      guildID: guild.id,
      guildName: guild.name
    };
  
    await Braking.createGuild(newGuild);
};