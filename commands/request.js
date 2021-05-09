const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

const random = require("random")

module.exports.run = async (client, message, args, prefix, db) => {
    if(args[1]){
        let link = args[1]
        let id = random.int(0, 9999999)
        db.collection('guilds').doc(message.guild.id).collection('pending').doc(`${id}`).set({
            'link' : link,
            'userid' : message.author.id,
        }).then(() => {
            message.delete()
            embed(message,"Requested your run to the moderators.", settings.colors.green)
            let channelId;
            db.collection('guilds').doc(message.guild.id).get().then((karen) => {
                channelId = karen.data().req
            }).then(() => {
                let channelE = client.channels.cache.get(channelId);
                const Pogs = new Discord.MessageEmbed()
                .setTitle('New run request')
                .setDescription(`${message.author} has sent a run request, check it with \`l!queue\`.`)
                .setColor(settings.colors.cyan)
                .setFooter('By TheDiamondMurder')
                channelE.send(Pogs)
            })
        })
    }else{
        return embed(message, "Please provide a link to the video.", settings.colors.red)
    }
}
module.exports.config = {
    name: "request",
    aliases: ["req"],
    description: "Submits a run to be reviewed and verified.",
    usage: "request [Link to video]",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}