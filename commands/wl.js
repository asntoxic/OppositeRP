const config = require("../config.json");
const Discord = require("discord.js");

const successEmbed = new Discord.MessageEmbed()
    .setDescription("Gratulacje, zdałeś pomyślnie **whiteliste**! Pamiętaj aby przestrzegać regulamin i odgrywać poprawnie rp!\n\nAby połączyć się z serwerem wystarczy że w **fivem'ie** wpiszesz \n``connect wyspa.maxrp.pl``")
    .setColor(0x00FF00)
    .setAuthor('Przyznano range Obywatel', '','')
    .setFooter("MaxRP 2021 ■ hypereg")
    .setThumbnail("https://thumbs.gfycat.com/EasygoingWastefulIridescentshark-small.gif");
module.exports = {
    name: 'wl',
    description: 'Simple whitelist command', //Optional
    execute(message, client) {
        try {
            const mentioned = message.mentions.members.first();
            for (let a in config.wlCheckersList) {
                if (message.member.roles.cache.has(config.wlCheckersList[a])) {
                    mentioned.roles.remove(config.imigrantID);
                    mentioned.roles.add(config.obywatelID);
                    message.reply(`Gratulacje, pomyślnie nadałeś role **obywatel** ${mentioned} 🎉`);
                    mentioned.send(successEmbed);
                    break;
                }
            }
        }catch (error){
            console.log("error");
        }

    }
}