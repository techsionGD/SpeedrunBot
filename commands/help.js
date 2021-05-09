const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message,args, prefix) => {
    if(args[1]){
        let command = args[1]
        if(client.commands.has(command)){
            command = client.commands.get(command);
            const commandInfo = new Discord.MessageEmbed()
            .setTitle(`${args[1]}`)
            .setDescription(`**Aliases:** ${command.config.aliases} \n **Description:** \n ${command.config.description} \n **Premium:** ${command.config.premium} \n **Usage:** ${prefix}${command.config.usage}`)
            .setColor(settings.colors.cyan)
            .setFooter("Made by TheDiamondMurder")
            .setTimestamp()
            message.channel.send(commandInfo)
        }else{
            embed(message, "This command does not exist", settings.colors.red)
        }
    }else{
        const page1 = new Discord.MessageEmbed()
        .setTitle("Help / Page 1")
        .setDescription("`help` `delmod` `perms` `setmod` `setPrefix` `test` `leaderboard` `queue` `redeem` `reject` `request` `rules` `serial` `setup` `sub` `verify` `version`")
        .setColor(settings.colors.cyan)
        .setFooter("Made by TheDiamondMurder")
        .setTimestamp()


        const allPage = [
            page1,
        ]

        let emojiList = ["◀","▶"]

        pages(message, allPage, emojiList, 60000)
    }
}
module.exports.config = {
    name: "help",
    aliases: ["cmds"],
    description: "Shows you all the commands.",
    usage: "help `(Command Name)`",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}