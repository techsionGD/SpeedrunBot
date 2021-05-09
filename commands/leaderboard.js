const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let runs = new Array;
    let number = 1
    message.channel.send('Fetching Leaderboard...').then((fetchMessage) => {
        db.collection("guilds").doc(message.guild.id).collection('runs').orderBy("time", "asc").get().then((leaderboard) => {
            leaderboard.docs.forEach(aUser => {
                runs.push(`#${number} | **<@!${aUser.data().userID}>** | ${aUser.data().time} | [Video](${aUser.data().video})`)
                number = number + 1
            })
        }).then(() => {
            const LeaderboardPog = new Discord.MessageEmbed()
            .setTitle(`Leaderboard`)
            .setDescription(runs)
            .setColor(settings.colors.others)
            .setFooter(`${settings.footer} | These runs are verified`)
            .setColor(settings.colors.cyan)
            fetchMessage.delete()
            message.channel.send(LeaderboardPog)
            number = 1
        })
    })
    
}
module.exports.config = {
    name: "leaderboard",
    aliases: ["rankings","runs","board","lb","leaderboards"],
    description: "Shows you the leaderboard for this server.",
    usage: "leaderboard",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}