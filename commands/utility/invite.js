module.exports = {
    name: 'invite',
    aliases: ['link','links','vote','invibe','owlvernyte'],
    category: 'Utility',
    utilisation: '{prefix}invite',

    execute(bot, message) {
      // message.channel.send({
      //   embed: {
      //     color: 'RANDOM',
      //     author: {name: 'Invibe me!', url: 'https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot'}
      //   }
      // })
      message.channel.send({
        embed: {
          color: 'RANDOM',
          author: { name: '>> Invibe me! <<', 
            url: 'https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot',
            icon_url: 'https://cdn.discordapp.com/attachments/852888201391374376/853598262724395018/20210613_182942.gif'},
          description: `Heres your links, ${message.author.tag}.`,
          fields: [
            {
              name: 'Connect with us',
              value: `[Youtube](https://www.youtube.com/channel/UCEG5sgFKieaUuHsu5VG-kBg) | [Discord](https://discord.link/owlvernyte) | [Facebook](https://www.facebook.com/owlvernyte)`
            },
            {
              name: `Vote`,
              value: `[Vote our server](https://top.gg/servers/830110554604961824/vote) | [Vote me here](https://top.gg/bot/853623967180259369/vote)`,
            },
            {
              name: `Buy me a coffee`,
              value: `[Playerduo](https://playerduo.com/owlvernyte)`
            }
          ],
        }
      });
    },
};
