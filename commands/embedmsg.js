const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'embedmsg',
    description: 'Komenda na pisanie embed message', //Optional
    async execute(message) {
        for (let a in config.embedMsgPermissionRolesID) {
            if (message.member.roles.cache.has(config.embedMsgPermissionRolesID[a])) {
                const { client } = message;
                const glownaEmbed = new Discord.MessageEmbed();
                message.channel.send("**Oznacz kanał** na który chcesz wysłać wiadomość.\n\n Przykład: ``#przykladowymainChannel``")
                const filter = m => m.author.id === message.author.id
                await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const descrip = collected.first().content
                    const channelCheck = descrip.slice(2, descrip.length - 1)
                    const mainChannel = client.channels.cache.get(`${channelCheck}`)
                    if(!mainChannel){
                        const embed2 = new Discord.MessageEmbed().setDescription(`Podany kanał nie został znaleziony, ponów próbę!`).setColor(`#ff0000`)
                        message.channel.send(embed2)
                        return
                    }
                    await message.channel.send("**Podaj tytuł wiadomości** które ma znajdować się w twojej embed message.\n\nPrzykład: ``Przykładowa wiadomosc``\n\nPamiętaj że masz minute na odpowiedzenie\n\nJeśli nie chcesz dawac tytułu napisz ``anuluj``")
                        const filter = m => m.author.id === message.author.id
                        await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(async collected => {
                            const tytul = collected.first().content
                            if(tytul.toLowerCase() !== `anuluj`){
                                if(tytul.length > 255){
                                    message.reply(`Niestety twój tytuł jest zbyt długi!\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                    return
                                }
                                glownaEmbed.setTitle(tytul)
                            }
                            await message.channel.send("**Podaj tytuł opis** które ma znajdować się w twojej embed message.\n\nPrzykład: ``Przykładowa wiadomosc``\n\nPamiętaj że masz minute na odpowiedzenie\n\nJeśli nie chcesz dawac opisu napisz ``anuluj``")
                                const filter = m => m.author.id === message.author.id
                                await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(async collected => {
                                    const opis = collected.first().content
                                    if(opis.toLowerCase() !== `anuluj`){
                                        if(opis.length > 2047){
                                            message.reply(`Niestety opis jest zbyt długi spróbuj ponownie!\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                            return
                                        }
                                        glownaEmbed.setDescription(`${opis}`)
                                    }
                                    await message.channel.send("**Podaj footer** które ma znajdować się w twojej embed message.\n\nPrzykład: ``Przykładowa wiadomosc``\n\nPamiętaj że masz minute na odpowiedzenie\n\nJeśli nie chcesz dawac footeru napisz ``anuluj``")
                                    const filter = m => m.author.id === message.author.id
                                        await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                        .then(async collected => {
                                            const footer = collected.first().content
                                            if(footer.toLowerCase() !== `anuluj`){
                                                if(footer.length > 2047){
                                                    message.reply(`Footer jest zbyt długi!\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`);
                                                    return
                                                }
                                                glownaEmbed.setFooter(footer, config.iconServerURL);
                                            }
                                            await message.channel.send("**Podaj kolor** które ma znajdować się w twojej embed message.\n\nPrzykład: ``#00000``\n\nPamiętaj że masz minute na odpowiedzenie\n\nJeśli nie chcesz dawac koloru napisz ``anuluj``")
                                                    const filter = m => m.author.id === message.author.id
                                                    await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                                    .then(async collected => {
                                                        const color = collected.first().content
                                                        if(color.toLowerCase() !== `anuluj`){
                                                            glownaEmbed.setColor(`${color}`)
                                                        }
                                                        await message.channel.send("Jeśli chcesz napewno wysłać tą wiadomosc na dany kanał wpisz ``tak``");
                                                        await message.channel.send(glownaEmbed)
                                                            const filter = m => m.author.id === message.author.id
                                                            await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                                            .then(async collected => {
                                                                const result = collected.first().content.toLowerCase()
                                                                if(result === `tak`){
                                                                    glownaEmbed.setTimestamp();
                                                                    await mainChannel.send(glownaEmbed)
                                                                    message.channel.send("**Gratulacje pomyślnie wysłałeś wiadomośc!**")
                                                                }
                                                            })
                                                            .catch(() => {
                                                                message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                                            });
                                                    })
                                                    .catch(() => {
                                                        message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                                    });
                                        })
                                        .catch(() => {
                                            message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                        });
                                })
                                .catch(() => {
                                    message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                                });
                        })
                        .catch(() => {
                            message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                        });
                })
                .catch(() => {
                    message.reply(`Czas na odpowiedź minął\n\nSpróbuj ponownie komendą **${config.prefix}embedmsg**`)
                });
            }
        }
    }
}