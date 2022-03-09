E.R.I.S Word filter system

**How does it work ? **

- Eris will track down any message on a text-channel that contains any of the words you enter in line -24/index.js and delete it.
  Then it will send an embed message on the member who used the certain filtered word, to explain why it was deleted and provide the contained message.
  [The bot will ignore users with ADMINISTRATOR permission]
  [ It will NOT warn the member or take any action like kick,mute or ban ]

You can add many more different rules for different types of words (nsfw, swear words, politics) as long as you follow the following pattern :

---

let rule2 = ["word1","word2"];
let foundrule2 = false;

for(var i in rule2) {
if(!message.member.permissions.has("ADMINISTRATOR") && message.content.toLowerCase().includes(rule2[i].toLowerCase())) foundrule2 = true;
}

if(foundrule2)
{
//LOG MESSAGE EMBED//
let log = new Discord.MessageEmbed()
log.setColor("RANDOM");
log.setTitle("Text");
log.setDescription("**Member** : <@" + message.author.id + ">");
log.addField("Message content :", "`"+ message.content + "`");
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

More information :
"<@"+ message.author.id + ">" will mention the member who used the certain word
"" + message.content + "" will paste the message content

message.author.send({embeds:[embedname]}) will send DM embed
message.author.reply({embeds:[embedname]}) will send reply embed, but you have to add await operator on message.delete()

1). You cant reply on a deleted message, so you have to use await operator in order to delay the delete action.
2). You can increase or decrease the await time.

Channel reply method :

message.channel.send({embeds:[a]})
.then(message => {
setTimeout(() => message.delete(), 12000)
})
.catch('I could not delete the message');

--------------- --- / Discord API /--- ---------------
discord.js v13

embed post/create method :

At the top : const { MessageEmbed } = require('discord.js');

Inside your code : let embedname = new Discord.MessageEmbed()

Content method :

embedname.content("text,url,hexcode");
example :
embed1.setColor(RANDOM);
embed.setDescription("Some text");
embed.addField("Field message","message content")

You can find the content types here : https://discordjs.guide/popular-topics/embeds.html#using-the-embed-c

Send the message :
message.author.send({embeds:[embedname]});
