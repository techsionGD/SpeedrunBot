const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    embed(message, "Click [here](https://discord.com/oauth2/authorize?client_id=819305344723320853&scope=bot&permissions=805314622) to invite the bot to your discord server.", settings.colors.cyan)
}
module.exports.config = {
    name: "invite",
    aliases: [],
    description: "Gives server invite.",
    usage: "help `(Command Name)`",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}