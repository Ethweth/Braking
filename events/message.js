module.exports = async (Braking, msg) => {
   const settings = await Braking.getGuild(msg.guild);
   if (msg.author.bot) return;
   if (msg.content.indexOf(settings.prefix) !== 0) return;
   
   const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();

   const cmd2 = Braking.commands.get(command);
      if (!cmd2) return undefined;
      cmd2.run(Braking, msg, args, settings);
  

};