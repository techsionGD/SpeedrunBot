const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")
const Embed = require("../db/embed")

module.exports.run = async (client, message, args, prefix, db) => {
    let runID = args[1]
    let reason = message.content.slice(prefix.length + args[0].length + 1 + args[1].length + 1)
    let exists;
    let userid
    let link;
    if(!runID) return embed(message, "Please enter a run ID", settings.colors.red)
    if(!reason) returnembed(message, "Please enter a a reason", settings.colors.red)
    db.collection('guilds').doc(message.guild.id).collection('pending').doc(runID).get().then((existorno) => {
        if(existorno.exists){
            exists = true
            userid = existorno.data().userid;
            link = existorno.data().link;
        }else{
            exists = false
        }
    }).then(() => {
        if(!exists == true) return embed(message, "This is not a valid run or has been deleted.", settings.colors.red)
        db.collection('guilds').doc(message.guild.id).collection('pending').doc(runID).delete({})
        embed(message, "Rejected this run.", settings.colors.green)
        let dmUser = client.users.cache.get(userid)
        const rejectEmbed = new Discord.MessageEmbed()
        .setDescription(`Your [run](${link}) was rejected by ${message.author}. \n **Reason:** ${reason}`)
        .setColor(settings.colors.red)
        .setFooter('Made by TheDiamondMurder')
        .setTimestamp()
        dmUser.send(rejectEmbed)
        message.delete()
    })
}
module.exports.config = {
    name: "reject",
    aliases: [],
    description: "Rejects a pending run.",
    usage: "reject [Run ID] [Reason]",
    category: "Info",
    developer: false,
    permission: "mod",
    premium: false,
}