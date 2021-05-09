const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    const queueEmbed = new Discord.MessageEmbed()
    .setTitle('The Pending Queue')
    .setDescription('Below are the pending runs awaiting to be verified.')
    .setColor(settings.colors.cyan)
    db.collection("guilds").doc(message.guild.id).collection('pending').get().then((allQueue) => {
        allQueue.docs.forEach(getDocs => {
            queueEmbed.addField(`${getDocs.id}`,`**Run ID:** ${getDocs.id} \n **Video:** ${getDocs.data().link} \n **User:** <@!${getDocs.data().userid}>`)
        })
    }).then(() => {
        message.author.send(queueEmbed)
        embed(message, "Sent you the queue in DMs.", settings.colors.cyan)
    })
}
module.exports.config = {
    name: "queue",
    aliases: [],
    description: "Shows you the queue of runs",
    usage: "queue",
    category: "Info",
    developer: false,
    permission: "mod",
    premium: false,
}