const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
if (!config.token) return console.log("You didn't provide a valid token in config.json");

client.commands = new Discord.Collection();

client.on('message', async message =>{

    if (message.author.bot) return;
    if (!message.channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS'])) return;
    if (!config.channel_id) {
    console.log(`\`[${message.guild} (${message.guild.id})] \n#${message.channel.name} (${message.channel.id}): \n(${message.author.username} (${message.author.id})): \n${message.content}\``)
} else {
    message.guild.channels.cache.get(config.channel_id).send(`\`Server: ${message.guild}\nServer ID: (${message.guild.id})\n\nChannel: ${message.channel.name}\nChannel ID: (${message.channel.id})\n\nAuthor: ${message.author.username}\nAuthor ID: (${message.author.id})\n\nMessage Content:\n${message.content}\``);
}

});

client.login(config.token);