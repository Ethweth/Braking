exports.run = async (Braking, msg, args) => {
    function clean(text) {
        if (typeof text === "string") 
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
      }

    if (msg.author.id !== "599564487703658516") return undefined;
    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    msg.channel.send(cleanCode, { code: "js" });


};

exports.help = {
  name: "eval"
};