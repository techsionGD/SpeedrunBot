const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")

module.exports.run = async (client, message, args, prefix, db) => {
    let setupdone;
    db.collection('guilds').doc(message.guild.id).get().then((issetup) => {
        setupdone = issetup.data().setupdone
    }).then(() => {
        if(!setupdone == false) return embed(message, "This server has already been setup. Contact developers if you wish to change something.", settings.colors.red)
        embed(message, "Welcome to the interactive setup! This will get your server ready to go. Are you ready to begin setup, enter `yes` if you are, and `no` if you are not, you can end the setup by typing cancel at any time.", settings.colors.cyan)
    message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ["time"],})
    .then((collected1) => {
        if(collected1.first().content == "yes" || collected1.first().content == "Yes"){
            embed(message, "Awesome, so now that we have agreed, you might want to make some rules, these rules can be seen by people who are submiting runs. You have 5 minutes. \nSay `cancel` to stop the setup.")
            message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 60000 * 5, errors: ["time"],})
            .then((collected2) => {
                console.log("Collected Rules")
                if(collected2.first().content == "cancel" || collected2.first().content == "Cancel"){
                    console.log("nvm canceled.")
                    return embed(message, "Setup cancelled.", settings.colors.red)
                }else{
                    console.log("got rules gonna add")
                    db.collection('guilds').doc(message.guild.id).update({
                        'rules' : collected2.first().content,
                    }).then(() => {
                        console.log("Added rules")
                        embed(message, "Rules updated!", settings.colors.green)
                        embed(message, "Now please input the game that your leaderboards will be based on.", settings.colors.cyan)
                        message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ["time"],})
                        .then((collected3) => {
                            if(collected3.first().content == "cancel" || collected2.first().content == "Cancel"){
                                return embed(message, "Setup cancelled.", settings.colors.red)
                            }else{
                                db.collection('guilds').doc(message.guild.id).update({
                                    'game' : collected3.first().content,
                                }).then(() => {
                                    embed(message, "Game updated!", settings.colors.green)
                                    embed(message, "Please select a channel where run requests will go.")
                                    message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ["time"],})
                                    .then((collected35) => {
                                        if(collected3.first().content == "cancel" || collected2.first().content == "Cancel"){
                                            return embed(message, "Setup cancelled.", settings.colors.red)
                                        }else{
                                            let channel;
                                            channel = collected35.first().mentions.channels.first();
                                            db.collection('guilds').doc(message.guild.id).update({
                                                'req' : channel.id
                                            }).then(() => {
                                                embed(message, "Set a request channel", settings.colors.green)
                                                embed(message, "Finally, do you want a custom prefix? If you do type the prefix you want in, if you dont, then just say `skip`. You can always change the prefix by using `l!setprefix [New Prefix]`", settings.colors.cyan)
                                                message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ["time"],})
                                                .then((collected4) => {
                                                    if(collected4.first().content == "cancel" || collected2.first().content == "Cancel"){
                                                        return embed(message, "Setup cancelled.", settings.colors.red)
                                                    }else{
                                                        if(collected4.first().content == "skip"){
                                                            embed(message, "Skipped prefix", settings.colors.cyan)
                                                            embed(message, "Completed setup!", settings.colors.green)
                                                            db.collection('guilds').doc(message.guild.id).update({
                                                                'setupdone' : true,
                                                            })
                                                        }else{
                                                            db.collection('guilds').doc(message.guild.id).update({
                                                                'prefix' : collected4.first().content,
                                                            }).then(() => {
                                                                embed(message, "Changed Prefix", settings.colors.green)
                                                                embed(message, "Completed setup!", settings.colors.green)
                                                                db.collection('guilds').doc(message.guild.id).update({
                                                                    'setupdone' : true,
                                                                })
                                                            })
                                                        }
                                                    }
                                                    
                                                }).catch((err1) => {
                                                    console.log(err1)
                                                    return embed(message, "Error: Your time has ran out. Please re-run the setup command to continue.", settings.colors.red)
                                                })
                                            })
                                        }

                                    }).catch((err11) => {
                                        console.log(err11)
                                        return embed(message, "Error: Your time has ran out. Please re-run the setup command to continue.", settings.colors.red)
                                    })
                                    
                                })
                            }
                        }).catch((err2) => {
                            console.log(err2)
                            return embed(message, "Error: Your time has ran out. Please re-run the setup command to continue.", settings.colors.red)
                        })
                    })
                }
            }).catch((err3) => {
                console.log(err3)
                return embed(message, "Error: Your time has ran out. Please re-run the setup command to continue.", settings.colors.red)
            })
        }else{
            return embed(message, "Setup cancelled.", settings.colors.red)
        }
    }).catch((err4) => {
        console.log(err4)
        return embed(message, "Error: Your time has ran out. Please re-run the setup command to continue.", settings.colors.red)
    })
    })

    
}
module.exports.config = {
    name: "setup",
    aliases: [],
    description: "Leads you into an interactive setup.",
    usage: "setup",
    category: "Info",
    developer: false,
    permission: "admin",
    premium: false,
}