const Discord = require("discord.js")
const embed = require("../db/embed")
const settings = require("../db/main.json")
const pages = require("discord.js-pagination")
const Embed = require("../db/embed")

module.exports.run = async (client, message, args, prefix, db) => {
    let version;
    let versionReleaseDate;
    let changelog;

    db.collection('botinfo').doc("info").get().then((versionYes) => {
        version = versionYes.data().version
        versionReleaseDate = versionYes.data().versionrelease
        changelog = versionYes.data().changelog
    }).then(() => {
        Embed(message, `**Version:** ${version} \n **Version Release Date:** ${versionReleaseDate} \n\n __**Changelog:**__ \n ${changelog}`)
    })
}
module.exports.config = {
    name: "version",
    aliases: ["ver"],
    description: "Gives you bot version",
    usage: "version",
    category: "Info",
    developer: false,
    permission: "all",
    premium: false,
}