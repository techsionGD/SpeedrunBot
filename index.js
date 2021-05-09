const Discord = require("discord.js")
const client = new Discord.Client()
const info = require("./db/main.json")
let token;
const Embed = require("./db/embed")
const fs = require("fs")

const random = require("random")

let prefix;

let isMod;
let isAdmin;
let isDev;

let isPremium;
let expires;


const selected = "beta"

token = info.maintoken;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})
// Call DB
const firebase = require("firebase/app")
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const { settings } = require("cluster");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
let db = admin.firestore();

// DB Creation

client.on('guildCreate', async gData => {
    const hub = client.guilds.cache.get("798159660829245480")
    if(!hub) return;
    let logs = hub.channels.cache.find(c => c.name === "logs")
    db.collection('guilds').doc(gData.id).set({
        'expires': 0,
        'prefix' : "l!",
        'premium' : false,
        'name' : gData.name,
        'rules' : "No Rules Set.",
        'setupdone' : false,
        'req' : 0,
        'game' : "None",
    }).then(() =>{
        db.collection('guilds').doc(gData.id).collection('admin').doc(gData.ownerID).set({
            'name' : gData.owner
        }).then(() => {
            db.collection('guilds').doc(gData.id).collection('moderator').doc(gData.ownerID).set({
                'name' : gData.owner
            })
        })
    }) 
})
// fs
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }else{
        console.log(`Command Files Loaded: ${jsfile.length}`)
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
        
        
    });
});

let isLocked;


client.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type == "dm"){
        if(message.content.startsWith("l!")){
            return Embed(message, "You cannot use commands in DMs.", info.colors.red)
        }else{
            return;
        }
    } 
    db.collection("guilds").doc(message.guild.id).get().then((options) => {
        prefix = options.data().prefix;
        isPremium = options.data().premium;
        expires = options.data().expires
    }).then(() => {
        db.collection('locked').doc(message.channel.id).get().then((isLockee) => {
            if(isLockee.exists){
                isLocked = true
            }else{
                isLocked = false
            }
        }).then(() => {
            if(!message.content.startsWith(prefix)) return;
            db.collection("guilds").doc(message.guild.id).collection('moderator').doc(message.author.id).get().then((modCheck) => {
                if(modCheck.exists){
                    isMod = true
                }else{  
                    isMod = false
                }
            }).then(() => {
                db.collection("developers").doc(message.author.id).get().then((devCheck) => { 
                    if(devCheck.exists){
                        isDev = true
                        isMod = true
                        isAdmin = true
                    }else{
                        isDev = false
                    }
            }).then(() =>{
                db.collection("guilds").doc(message.guild.id).collection("admin").doc(message.author.id).get().then((adminCheck) => { 
                    if(adminCheck.exists){
                        isAdmin = true
                    }else{
                        isAdmin = false
                    }
            }).then(() => {
                if(isPremium == true){
                    if(expires < Date.now()){
                        isPremium = false
                        db.collection('guilds').doc(message.guild.id).update({
                            'premium' : false,
                            'expires' : 0,
                        }).then(() => {
                            console.log("Expired!")
                        })
                    }
                }
    
                let args = message.content.substring(prefix.length).split(" ");
                let messageArray = message.content.split(" ");
                let cmd = messageArray[0];
                let command = message.content.slice(prefix.length)
                let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    
                if(commandfile){
                    if(!isLocked == false) return Embed(message, "This channel is locked from commands", info.colors.red)
                    console.log(`Command Execution: ${commandfile.config.name}`)
                    if(commandfile.config.premium == true){
                        if(!isPremium == true) return Embed(message, "This is a premium only command. To get premium please buy it from our [store]() and do `l!redeem [Serial Key]`")
                        if(commandfile.config.permission == "all"){
                            commandfile.run(client,message,args,prefix,db)
                            return;
                        }
                        if(commandfile.config.permission == "mod"){
                            if(!isMod == true) return Embed(message, "You do not have the required permission. You need `Leaderboard Mod`")
                            commandfile.run(client,message,args,prefix,db)
                        }
                        if(commandfile.config.permission == "admin"){
                            if(!isMod == true) return Embed(message, "You do not have the required permission. You need `Leaderboard Admin`")
                            commandfile.run(client,message,args,prefix,db)
                        }
                        if(commandfile.config.developer == true){
                            if(!isDev == true) return Embed(message, "You do not have the required permission. You need `bot.permission.dev`")
                            commandfile.run(client,message,args,prefix,db)
                        }
                    }else{
                        if(commandfile.config.permission == "all"){
                            commandfile.run(client,message,args,prefix,db)
                            return;
                        }
                        if(commandfile.config.permission == "mod"){
                            if(!isMod == true) return Embed(message, "You do not have the required permission. You need `Leaderboard Mod`")
                            commandfile.run(client,message,args,prefix,db)
                        }
                        if(commandfile.config.permission == "admin"){
                            if(!isMod == true) return Embed(message, "You do not have the required permission. You need `Leaderboard Admin`")
                            commandfile.run(client,message,args,prefix,db)
                        }
                    }
                    
                    
                }
            
            })
        })
    })
        })
       
    })
})

client.login(token)