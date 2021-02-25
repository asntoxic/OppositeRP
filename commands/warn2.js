const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'warn2',
    description: 'Komenda na zwarnowanie gracza', //Optional
    execute(message, client, args) {
        try {
            const mentioned = message.mentions.members.first();
            for (let a in config.warnAdministrationList) {
                if (message.member.roles.cache.has(config.warnAdministrationList[a])) {
                    message.delete();
                    message.reply(`Gratulacje, pomyślnie nadałeś warn #2 **obywatelelowi** ${mentioned} 🎉`).then(msg => msg.delete({timeout: 5000}));
                    const reason = args.slice(1).join(' ');
                    const warnEmbedMessageToChannel = new Discord.MessageEmbed()
                        .setDescription(` \n\n**Kto dostał warna:** ${mentioned}\n**Kto nadał warna:** <@${message.author.id}>\n**Który warn:** Warn 2\n**Powód:** ${reason}\n\n `)
                        .setColor(0x00FF00)
                        .setAuthor('WARN ROOM', '','')
                        .setFooter(config.serverName +" 2021 ■ hypereg")
                        .setThumbnail("https://media0.giphy.com/media/3Z1frUjlKRIqJhnhAW/source.gif");
                    mentioned.roles.add(config.warnRoleID2);
                    client.channels.cache.get(config.warnChannel).send(warnEmbedMessageToChannel);
                    break;
                }
            }
        }catch (error){
            console.log("error");
        }

    }
}