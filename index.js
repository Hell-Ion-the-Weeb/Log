const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
if (!config.token) return console.log("You didn't provide a valid token in config.json");

client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log('Ready')
});

client.on('message', async message =>{

    if (message.author.bot) return;
    if (!message.channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS'])) return;
    if (!config.channel_id) {
    console.log(`[${message.guild} (${message.guild.id})] \n#${message.channel.name} (${message.channel.id}): \n(${message.author.username} (${message.author.id})): \n${message.content}`)
} else if (message.attachments.size){
    message.attachments.forEach(attachment => {
        const ImageLink = attachment.proxyURL;
        client.channels.fetch(config.channel_id).then(channel => channel.send(`\`[${message.guild} (${message.guild.id})] \n#${message.channel.name} (${message.channel.id}): \n(${message.author.username} (${message.author.id})):\`\n\n${message.content}${ImageLink}`));
        return;
    });
} else {
    client.channels.fetch(config.channel_id).then(channel => channel.send(`\`[${message.guild} (${message.guild.id})] \n#${message.channel.name} (${message.channel.id}): \n(${message.author.username} (${message.author.id})):\`\n\n${message.content}`));
}

});

client.login(config.token);