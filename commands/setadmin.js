const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    if(message.author.id == message.guild.ownerID){
        let userToSet = message.mentions.users.first();
        let userID = userToSet.id 
        db.collection('guilds').doc(message.guild.id).collection("admin").doc(userID).set({
            'name' : userToSet.username
        }).then(() => {
            embed(message, `Set **${userToSet}** as admin`, settings.colors.green)
        })
    }else{
        embed(message, "You do not have permission to use this command. You need `Server Owner`", settings.colors.red)
    }
}
module.exports.config = {
    name: "setadmin",
    aliases: ["addadmin"],
    description: "Adds an admin [ONLY THE SERVER OWNER CAN DO THIS]",
    usage: "setadmin [@User]",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}