const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.id === config.bladChannelID) {
    		message.delete()
            const successEmbed = new Discord.MessageEmbed()
                .setDescription("**" + message.content + "**")
                .setColor(0xff0000)
                .setAuthor('💥 Błąd', '', '')
                .setFooter(config.serverName + " 2021 ■ Autor: " + message.author.tag);
            message.reply(successEmbed);
        }
});