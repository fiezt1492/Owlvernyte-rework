module.exports = {
    name: 'avatar',
    aliases: [],
    category: 'Utility',
    utilisation: '{prefix}avatar <mention>',

    async execute(bot, message, args) {
      const member = message.mentions.users.first() || message.author;

      // if (member) {
      //   return message.channel.send({
      //     embed: {
      //       color: "RANDOM",
      //       author: {
      //         name: `Avatar of ${member.user.tag}`,
      //       },
      //       image: {
      //         url: `${member.user.avatarURL()}`
      //       }
      //     }
      //   })
      // }

      message.channel.send({
        embed: {
          color: "RANDOM",
          author: {
            name: `${member.tag}'s avatar`
          },
          description: ``,
          image: {
            url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=256`
          },
        },
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: `WEBP`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.webp`,
              },
              {
                type: 2,
                label: `PNG`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`,
              },
              {
                type: 2,
                label: `JPG`,
                style: 5,
                url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.jpg`
              }
            ]
          }
        ]
      });
    },
};
