const ip = 'ploto.mcbe.fr';
const port = 19132;

const message = '§r§bAlexandre Warscotte §8= §aNagato §7?' // '§r§bVous souhaitez des spams efficaces ? §7-> §ahttps://discord.gg/NTW4xJ7UkU §8| §r§43D3N PRIME ?'
const delay = 10

const showRafales = true

const bedrock = require('bedrock-protocol');
const axios = require('axios');

const usernames = ['EdenAuPrime6594', 'EdenAuPrime5973', 'EdenAuPrime3907', 'EdenAuPrime6038', 'EdenAuPrime']
// const usernames = ['CreakyShoe9617', 'ColderWolf4085', 'SneakNote8967', 'ModernFire8804', 'EvilChair456742', 'BonStream', 'SorvekVl', 'JeFeSaPrLaPatri', 'OvalAlpaca26776', 'WiseSeeker49675', 'SonicCorgi70177', 'U r Bottom', 'BOT2343899', 'ValuedTwo947073', 'FlexedLion7481', 'FieryCobra8025', 'VampyPond5855', 'ShellCoder8247', 'EarnedBull1607', 'JeTeDetruit1956'];

for (let i = 0; i < usernames.length; i++) {
  let client;
  try {
    console.log(usernames[i]);
    client = bedrock.createClient({
      host: ip,
      port: +port,
      connectTimeout: 10_000,
      viewDistance: 1,
      username: usernames[i],
      skipPing: true,
      offline: false,
      profilesFolder: './accounts'
    });
  }
  catch(err) {
    console.log(err);
  }

  if (client) {
    client.on('spawn', () => {
      axios.get(`https://api.mcsrvstat.us/2/${ip}:${port}`)
        .then((response) => {
          const players = response.data.players.list.filter(item => item !== client.username);
          console.log(client.username)
          let index = 0;
          setInterval(() => {
            const player = players[index];
            client.queue('text', {
              type: 'chat', needs_translation: false, source_name: client.username, xuid: '', platform_chat_id: '',
              message: `/msg "${player}" ${message}`
            });
            index = (index + 1) % players.length;
            if (index === 0 && showRafales === true) {
              console.log('\x1b[33m+ 1 rafale');
            }
          }, delay);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    client.on('kick', () => {
      console.log('\x1b[31mLe bot a été déconnecté.')
    });
  }

}