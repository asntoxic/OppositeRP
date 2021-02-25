const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");
const successEmbed = new Discord.MessageEmbed()
    .setDescription("Gratulacje, otrzymales role imigrant zapraszamy do zdania whitelisty!")
    .setColor(0x00FF00)
    .setAuthor('Przyznano range imigrant', '','')
    .setFooter(config.serverName + " 2021 ■ hypereg")
    .setThumbnail("https://thumbs.gfycat.com/EasygoingWastefulIridescentshark-small.gif");
client.on('messageReactionAdd', async (reaction, user) => {

    if (reaction.message.id === config.reactionMessageID) {
        await reaction.message.guild.member(user).roles.add(config.imigrantID);
        user.send(successEmbed);

    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.id === config.reactionMessageID) {
        await reaction.message.guild.member(user).roles.remove(config.imigrantID);
    }
});