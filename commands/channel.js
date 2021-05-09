const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    if(args[1] == "lock"){
        let channel;
        if(args[2]){
            channel = message.mentions.channels.first();
        }else{
            channel = message.channel
        }
        db.collection('locked').doc(channel.id).create({
            'guild' : message.guild.name,
            'channel-name' : message.channel.name
        }).then(() => {
            embed(message, "Locked this channel from commands.")
        })

    }
    if(args[1] == "unlock"){
        let channel2;
        if(args[2]){
            channel2 = message.mentions.channels.first();
        }else{
            channel2 = message.channel
        }
        db.collection('locked').doc(channel2.id).delete({
            'guild' : message.guild.name
        }).then(() => {
            embed(message, "Unlocked this channel from commands.")
        })

    }
}
module.exports.config = {
    name: "channel",
    aliases: [],
    description: "Locks/unlocks channel from commands.",
    usage: "channel [lock/unlock] (#Channel)",
    category: "Info",
    developer: false,
    permission: "admin",
    premium: false,
}