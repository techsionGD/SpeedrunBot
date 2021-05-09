const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let userToSet = message.mentions.users.first();
    let userID = userToSet.id 

    let exists;
    db.collection('guilds').doc(message.guild.id).collection("moderator").doc(userID).get().then((pog) => {
        if(pog.exists){
            exists = true
        }else{
            exists = false
        }
    }).then(() => {
        if(exists == false) return embed(message, "This user is not a mod.", settings.colors.red)
        db.collection('guilds').doc(message.guild.id).collection("moderator").doc(userID).delete({}).then(() => {
            embed(message, "I removed this user from mod.", settings.colors.green)
        })
    })
}
module.exports.config = {
    name: "delmod",
    aliases: ["removemod"],
    description: "Shows you all the commands.",
    usage: "delmod `[@User]`",
    category: "Info",
    developer: false,
    permission: "admin",
    premium: false,
}