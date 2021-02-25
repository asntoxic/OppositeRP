const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.twitterChannelID) {

        const successEmbed = new Discord.MessageEmbed()
            .setDescription("**" + message.content + "**")
            .setColor(0x0000FF)
            .setAuthor('Twitter', 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png','')
            .setFooter(config.serverName +" 2021 ■ Autor: " + message.author.tag);
        message.reply(successEmbed);
        message.delete();
    }
});