const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")
const Embed = require("../db/embed")

module.exports.run = async (client, message, args, prefix, db) => {
    let Newprefix = args[1]
    if(!Newprefix) return embed(message, "Please input a prefix",settings.colors.red)
    db.collection('guilds').doc(message.guild.id).update({
        'prefix': Newprefix,
    }).then(() => {
        Embed(message, `Set the prefix to \`${Newprefix}\``, settings.colors.green)
    })
}
module.exports.config = {
    name: "setPrefix",
    aliases: ["setprefix"],
    description: "Sets a new prefix",
    usage: "setPrefix `[New Prefix]`",
    category: "Info",
    developer: false,
    permission: "admin",
    premium: false,
}