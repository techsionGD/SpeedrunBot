const Discord = require("discord.js")
function Embed(message, description, color) {
    const Gened = new Discord.MessageEmbed()
    .setDescription(`${description}`)
    .setColor(color)
    .setFooter("Made by TheDiamondMurder")
    .setTimestamp()
    message.channel.send(Gened)
}
module.exports = Embed;