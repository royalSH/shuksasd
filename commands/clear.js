const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**:x: | N-ai gradul necesar pentru a folosii aceasta comanda!**");
  if(!args[0]) return message.channel.send("**/clear <numar mesaje>**");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**:wastebasket: | Am sters ${args[0]} mesaje/mesaj!**`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}
