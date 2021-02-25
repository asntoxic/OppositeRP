const {client} = require('../index');
const Discord = require("discord.js");
const config = require("../config.json");

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === `dm`) return
    if (message.content.includes(`discord.gg`)) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            return;
        } else {
            message.delete();
            message.reply("Nie masz uprawnien aby wyslac tutaj zaproszeń!");
        }
    } else {
        return;
    }
});