const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'Simple clear command', //Optional
    execute(message, client) {

   	const args = message.content.slice(config.prefix.length).split(/ +/);
   	console.log(args[0])
   	console.log(args[1])
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Nie posidasz permisji!');
    let deleteAmount;

    if (isNaN(args[1]) || parseInt(args[1]) <= 0) { return message.reply('Podaj liczbe wiadomosci które chcesz wyczyścić!') }

    if (parseInt(args[1]) > 100) {
        return message.reply('Możesz maksymalnie usunąć **100** wiadomości!')
    } else {
        deleteAmount = parseInt(args[1]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);
    message.reply(`Pomyslnie usunięto **${deleteAmount}** wiadomosci.`)



    }
}