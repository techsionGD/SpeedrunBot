const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let userToSet = message.mentions.users.first();
    if(!userToSet) return embed(message, "Please mention a user", settings.colors.red)
    let userID = userToSet.id 
    db.collection('guilds').doc(message.guild.id).collection("moderator").doc(userID).set({
        'name' : userToSet.username
    }).then(() => {
        embed(message, `Set **${userToSet}** as moderator`, settings.colors.green)
    })
}
module.exports.config = {
    name: "setmod",
    aliases: ["addmod"],
    description: "Grants a user moderator permissions.",
    usage: "setmod `[@User]`",
    category: "Info",
    developer: false,
    permission: "admin",
    premium: false,
}