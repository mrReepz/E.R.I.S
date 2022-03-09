const Discord = require("discord.js");
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});
const { token, prefix } = require('./config.json');
const fs = require("fs");
const logchannel = client.channels.cache.find(channel => channel.id === "945523794490032148");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("E.R.I.S is online")
    client.user.setActivity("You", { type: "WATCHING"});
});

client.on('message', message => {
    if (message.channel.type === 'dm' || message.author.bot) return ;
    
    // FILTERED WORDS 
    let rule1 = ["word1,word2"];
    let foundrule1 = false;
   
    //READ FILTERED WORDS
    for(var i in rule1) {
        if(!message.member.permissions.has("ADMINISTRATOR") && message.content.toLowerCase().includes(rule1[i].toLowerCase())) foundrule1 = true;
    }
   
    if(foundrule1) 
    {
        //LOG MESSAGE EMBED//
        let log = new Discord.MessageEmbed()
        log.setColor("RANDOM");
        log.setTitle("Text");
        log.setDescription("**Member** : <@" + message.author.id + ">");
        log.addField("Message content :", "``"+ message.content + "``");
        log.setTimestamp();
        
        client.channels.cache.get('/LOG CHANNEL ID/').send({embeds: [log]});
        
        let dm = new Discord.MessageEmbed()
        dm.setColor("#e6e600");
        dm.setDescription("**Text** <@" + message.author.id + "> **text**");
        dm.addField("**Some more text**");
        dm.addField("Message content :", "``"+ message.content + "``");
        dm.setTimestamp();
        dm.setFooter("Server : /server name/");
        //SEND MESSAGE-EMBED
        message.author.send({embeds:[dm]});
        message.delete();      
    }
    
})

client.login(token);
