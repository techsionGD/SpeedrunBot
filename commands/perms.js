const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let adminList = new Array
    let modList = new Array
    const userPermList = new Discord.MessageEmbed()
    .setTitle('Users with Perms / Page 1 of 2')
    .setDescription(`List of users with their respective permission.`)
    .setColor(settings.colors.cyan)
    .setFooter('Made by TheDiamondMurder')
    .setTimestamp()
    db.collection('guilds').doc(message.guild.id).collection('admin').get().then((rawDoc) => { 
        rawDoc.docs.forEach(object => {
            userPermList.addField('Admin',`<@!${object.id}>`)
        })
    }).then(() => {
        db.collection('guilds').doc(message.guild.id).collection('moderator').get().then((rawMod) => { 
            rawMod.docs.forEach(object2 => {
                userPermList.addField('Moderator',`<@!${object2.id}>`)
            })
            const permList = new Discord.MessageEmbed()
            .setTitle('Perm List / Page 2 of 2')
            .setDescription('Ban/Kick: Moderator \n Delete Admin: Server Owner \n Delete Mod: Admin \n Add Mod: Admin \n Add Admin: Server Owner \n Redeem Premium: Admin \n SetPrefix: Admin')
            .setColor(settings.colors.cyan)
            .setFooter('Made by TheDiamondMurder')
            .setTimestamp()

            const embedLists = [
                userPermList,
                permList,
            ]

            pages(message, embedLists)
        })
    })
    
    
    
}
module.exports.config = {
    name: "perms",
    aliases: [],
    description: "Shows you all the permissions",
    usage: "perms",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}