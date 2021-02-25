const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'usunwarn',
    description: 'Komenda na unwarnowanie gracza', //Optional
    execute(message) {
        try {
            const mentioned = message.mentions.members.first();
            for (let a in config.warnAdministrationList) {
                if (message.member.roles.cache.has(config.warnAdministrationList[a])) {
                    message.delete();
                    message.reply(`Gratulacje, pomyślnie usunąłeś wszystkie warny **obywatelelowi** ${mentioned} 🎉`).then(msg => msg.delete({timeout: 5000}));
                    mentioned.roles.remove(config.warnRoleID1);
                    mentioned.roles.remove(config.warnRoleID2);
                    mentioned.roles.remove(config.warnRoleID3);
                    break;
                }
            }
        }catch (error){
            console.log("error");
        }

    }
}