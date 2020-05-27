const { Client, Collection } = require('discord.js');
const { TOKEN } = require('./config');
const Braking = new Client();
const fs = require("fs");

Braking.afk = new Map();
require("./util/function")(Braking);
Braking.mongoose = require("./util/mongoose");
Braking.commands = new Collection();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const evt = require(`./events/${file}`);
      const evtName = file.split(".")[0];
      console.log(`Loaded event '${evtName}'`);
      Braking.on(evtName, evt.bind(null, Braking));
    });
});

fs.readdir("./commands/", async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const props = require(`./commands/${file}`);
      const cmdName = file.split(".")[0];
      console.log(`Loaded command '${cmdName}'`);
      Braking.commands.set(cmdName, props);
    });
});

Braking.mongoose.init();
Braking.login(TOKEN);
Braking.on("error", console.error);
Braking.on("warn", console.warn);
// Braking.on("debug", console.log);