const config = require("../config.json");
const Discord = require("discord.js");

const successEmbed = new Discord.MessageEmbed()
    .setDescription("\n" + config.prefix + "instagram - komenda instagram **IC** służy do wysyłania zdjęć na instagram **na dm do bota**\n" + config.prefix +"otomoto  - komenda otomoto **IC** służy do wysyłania zdjęć na otomoto **na dm do bota**\n" + config.prefix + "pomoc - komenda do wyświetlenia wszystkich komend\n" + config.prefix + "wl **@nazwagracza** - tylko na serwerze na którym nadajemy whiteliste\n" +config.prefix + "warn1 **@nazwagracza** - tylko na serwerze na ktorym nadajemy mu warna\n"+config.prefix + "warn2 **@nazwagracza** - tylko na serwerze na ktorym nadajemy mu warna\n"+config.prefix + "warn3 **@nazwagracza** - tylko na serwerze na ktorym nadajemy mu warna\n" + config.prefix + "usunwarn **@nazwagracza** - usuwa wszystkie warny które posiada gracz")
    .setColor(0x00FF00)
    .setAuthor('Dostępne komendy:', '','')
    .setFooter("MaxRP 2021 ■ hypereg")
    .setThumbnail("https://thumbs.gfycat.com/EasygoingWastefulIridescentshark-small.gif");
module.exports = {
    name: 'pomoc',
    description: 'Simple pomoc command', //Optional
    execute(message, client) {
        if(message.channel.type = "dm"){
            message.reply(successEmbed);
        }
    }
}