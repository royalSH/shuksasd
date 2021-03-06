const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  bot.user.setActivity("✅ROVersion 1.1.8");

});

bot.on('message', msg => {
  if (msg.content === '/acmds') {
    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("**:x: | N-ai gradul necesar pentru a folosii aceasta comanda!**");
    msg.author.send(`
    **:scroll: | COMMANDLIST**
    /clear - stergi numarul dorit de mesaje dupa un animit channel!
    /setch - blochezi channel-ul pentru un anumit interval setat de tine!
    /gag - user-ul mentionat numai poate scrie pentru in interval de timp setat de tine!
    /ban - user-ul mentionat va primii ban!
    /kick - user-ul mentionat va fii scos dupa server!
    `);
  }
  const swearWords = ["discord.gg/", "discord.me/", "youtube.com/", "twitch.com/"];
    if( swearWords.some(word => msg.content.includes(word)) ) {
        msg.delete();
        msg.channel.send('**:satellite_orbital: | Reclama detectata!**');
      }
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(botconfig.token);
