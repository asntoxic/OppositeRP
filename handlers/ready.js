const {client} = require('../index');
const fetch = require('node-fetch');
const config = require("../config.json");



client.once('ready', async () => {
    setInterval(async () => {
        if ((Math.floor(Math.random() * 2) + 1) === 1) {
            try {
                let jsonFromURL = await fetch(config.ipServerWithPort, {method: "GET"}).then(json => json.json());
                let jsonObjectKeys = Object.keys(jsonFromURL).length;
                await client.user.setActivity(jsonObjectKeys + config.statusReadyDescribe, {
                    type: 'PLAYING',
                });
            }catch (error){
                await client.user.setActivity(config.statusExceptDescribe, {
                    type: 'PLAYING',
                });
            }
        }else{
            await client.user.setActivity(`Wpisz ${config.prefix}pomoc, aby uzyskac liste komend!`, {
                type: 'PLAYING',
            });
        }
    }, 3 * 1000);

});
