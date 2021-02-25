const Discord = require("discord.js");
const config = require("../config.json");

const loadingEmbed = new Discord.MessageEmbed()
    .setDescription("Pamiętaj że, jest to otomoto **[IC]** i pamiętaj o zachowaniu kultury podczas wrzucania zdjęcia")
    .setColor(0x800080)
    .setFooter("Poczekaj chwilke aż aplikacja się załaduje | "+ config.serverName+ " 2020")
    .setAuthor("Trwa ładowanie aplikacji otomoto 🚗 ", "https://www.bluechipexterminating.com/wp-content/uploads/2020/02/loading-gif-png-5.gif", "https://otomoto.pl/");

const lastNameEmbed = new Discord.MessageEmbed()
    .setDescription("Przykład: **Audi A4**")
    .setColor(0x800080)
    .setAuthor('Podaj marke oraz rodzaj pojazdu 📝', config.iconServerURL,'')
    .setFooter('Masz 30 sekund na wpisanie danych');

const hashtagsEmbed = new Discord.MessageEmbed()
    .setDescription("Przykładowa cena: **100000$**")
    .setColor(0x800080)
    .setAuthor('Podaj cene pojazdu', config.iconServerURL,'')
    .setFooter('Masz 30 sekund na dodanie ceny pojazdu');

const photoDescriptionEmbed = new Discord.MessageEmbed()
    .setDescription("Przykładowe informacje o pojezdzie: **Przebieg dosyć mały, zadbany samochód z 5 drzwiami, użytkowany przez mężczyzne**")
    .setColor(0x800080)
    .setAuthor('Załącz zdjęcię z dysku oraz dodaj opis 💻', config.iconServerURL,'')
    .setFooter('Masz 30 sekund na dodanie tagów');
const ErrorEmbed = new Discord.MessageEmbed()
    .setDescription("Nie udane wysłanie zdjęcia na **otomoto**")
    .setColor(0x800080)
    .setAuthor('ERROR', 'https://steamuserimages-a.akamaihd.net/ugc/90472493366823952/9AE061717B44506050E8D1AA5BAD3E51BCAD1185/?imw=1024&imh=768&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true','')
    .setFooter(config.serverName + " 2021 ■ hypereg");
const successEmbed = new Discord.MessageEmbed()
    .setDescription("Pomyślnie wysłano zdjęcie na **otomoto**")
    .setColor(0x00FF00)
    .setAuthor('SUKCES', config.iconServerURL,'')
    .setFooter(config.serverName + " 2021 ■ hypereg")
    .setThumbnail("https://propharmace.com/wp-content/uploads/2019/10/checkmark.gif");


module.exports = {
    name: 'otomoto',
    description: 'Otomoto discord ic.',
    execute(message,client) {
        if (message.channel.type == "dm") {
            const filter = response => {
                return "nullMessage";
            };
            message.channel.send(loadingEmbed).then(msg => {
                msg.delete({timeout: 5000})
            })
            setTimeout(function (){
                let ab = message.channel.send(lastNameEmbed).then(firstNameFunction => {
                    message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                        .then(collected => {
                            let firstCollected = collected.array();
                            firstNameFunction.delete();

                            let b = message.channel.send(hashtagsEmbed).then(hashtagsFunction => {
                                message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                                    .then(collected => {
                                        let secondCollected = collected.array();
                                        hashtagsFunction.delete();
                                        const c = message.channel.send(photoDescriptionEmbed).then(photoDescriptionFunction => {
                                            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                                                .then(collected => {
                                                    let attached = collected.first().attachments;
                                                    if (!attached.size > 0) {
                                                        message.reply(ErrorEmbed);
                                                        photoDescriptionFunction.delete();
                                                        return;
                                                    }
                                                    photoDescriptionFunction.delete();
                                                    let thirdCollected = collected.array();
                                                    const currently = new Date();
                                                    const datetime = currently.getDate() + "/"
                                                        + (currently.getMonth() + 1) + "/"
                                                        + currently.getFullYear() + " "
                                                        + currently.getHours() + ":"
                                                        + currently.getMinutes() + ":"
                                                        + currently.getSeconds();
                                                    const finishEmbed = new Discord.MessageEmbed()
                                                        .setColor(0x800080)
                                                        .setDescription(`\nMarka pojazdu: **${firstCollected}**\nCena pojazdu: **${secondCollected}**\nInformacje o pojezdzie: **${thirdCollected}**`)
                                                        .setImage(attached.first().url)
                                                        .setAuthor("otomoto.pl 🚗")
                                                        .setFooter(`By ${message.author.tag} • Data: ${datetime}`);
                                                    message.reply(finishEmbed);

                                                    const a5 = message.reply("Aby wysłac zdjęcie na serwer wpisz **'TAK'** lub **'NIE'**").then(checkLast => {
                                                        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                                            .then(collected => {
                                                                if(collected.first().content.toUpperCase() === "TAK"){
                                                                    checkLast.delete();
                                                                    client.channels.cache.get(config.otomotoChannelID).send(finishEmbed);
                                                                    message.reply(successEmbed);
                                                                } else if(collected.first().content.toUpperCase() === "NIE"){
                                                                    checkLast.delete();
                                                                    message.reply("Anulowano wysyłanie **zdjęcia!**");
                                                                }
                                                            }).catch(collected => {
                                                            checkLast.delete();
                                                            message.reply(ErrorEmbed);
                                                        });
                                                    });

                                                }).catch(collected => {
                                                photoDescriptionFunction.delete();
                                                message.reply(ErrorEmbed);

                                            });
                                        });
                                    }).catch(collected => {
                                    hashtagsFunction.delete();
                                    message.reply(ErrorEmbed);
                                });
                            });
                        }).catch(collected => {
                        firstNameFunction.delete();
                        message.reply(ErrorEmbed);
                    });
                });
            }, 5000);
        }
    }
}