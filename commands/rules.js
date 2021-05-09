const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let rules;

    db.collection('guilds').doc(message.guild.id).get().then((getrules) => {
        rules = getrules.data().rules;
    }).then(() => {
        embed(message, rules, settings.colors.cyan)
    })
}
module.exports.config = {
    name: "rules",
    aliases: [],
    description: "Shows you the run rules",
    usage: "rules",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}