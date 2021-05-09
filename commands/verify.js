const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    if(!args[1]) return embed(message, "Please provide a Run ID", settings.colors.red)
    if(!args[2]) return embed(message, "Please provide a time with format XX:XX", settings.colors.red)
    // run information
    let time = args[2]
    let link;
    let runner;
    let runId = args[1]

    let runExists;


    db.collection('guilds').doc(message.guild.id).collection('pending').doc(runId).get().then((getRun) => {
        if(getRun.exists){
            link = getRun.data().link
            runner = getRun.data().userid
            runExists = true
        }else{
            runExists = false
        }
    }).then(() => {
        if(!runExists == true) return embed(message, "This run ID is invalid, or doesnt exist anymore.", settings.colors.red)
        db.collection('guilds').doc(message.guild.id).collection('pending').doc(runId).delete({})
        db.collection('guilds').doc(message.guild.id).collection('runs').doc(runId).set({
            'time' : time,
            'video' : link,
            'userID' : runner,
        }).then(() => {
            embed(message, "Verifed the run! It is on the leaderboards now.", settings.colors.green)
            let sendUser = client.users.cache.get(runner)
            const verifedEmbed = new Discord.MessageEmbed()
            .setDescription(`Your [run](${link}) was verifed by ${message.author}!`)
            .setColor(settings.colors.green)
            .setFooter('Made by TheDiamondMurder')
            .setTimestamp()
            sendUser.send(verifedEmbed)
            message.delete()
        })
    })
}
module.exports.config = {
    name: "verify",
    aliases: [],
    description: "Verifies a run from the pending runs list. [Time format: xx:xx]",
    usage: "verify [Run ID] [Time]",
    category: "Info",
    developer: false,
    permission: "mod",
    premium: false,
}