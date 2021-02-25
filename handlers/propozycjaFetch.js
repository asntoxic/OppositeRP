const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");

client.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.id === config.propozycjaChannelID) {
        if (message.content.startsWith("%")) {
            message.delete();
            const successEmbed = new Discord.MessageEmbed()
                .setDescription(message.content.substring(1))
                .setAuthor('💬 Komentarz', '', '')
                .setFooter(config.serverName + " 2021 ■ Autor: " + message.author.tag);
            await message.channel.send(successEmbed);


        } else {

            const successEmbed = new Discord.MessageEmbed()
                .setDescription("**" + message.content + "**")
                .setColor(0x00ff00)
                .setAuthor('Propozycja', 'https://static.thenounproject.com/png/447429-200.png', '')
                .setFooter(config.serverName + " 2021 ■ Autor: " + message.author.tag + " ■ Aby dodać komentarz wpisz przed wiadomościa %");
            let a = message.reply(successEmbed).then(msg => {
                msg.react('✅');
                msg.react('❎');
            })
            await message.delete();
        }
    }
});