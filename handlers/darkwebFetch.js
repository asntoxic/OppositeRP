const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");

client.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.id === config.darkwebChannelID) {

        const successEmbed = new Discord.MessageEmbed()
            .setDescription("|| **" + message.content + "** ||")
            .setColor(0x000000)
            .setAuthor('Dark Web', 'https://i.redd.it/8l838ib7tu141.png','')
            .setFooter(config.serverName +" 2021 ■ Autor: " + message.author.tag);
        message.reply(successEmbed);
        message.delete();
    }
});