module.exports = {
    name: 'settings',
    aliases: [],
    category: 'Utility',
    utilisation: '{prefix}settings',

    async execute(bot, message) {
      const guildId = message.guild.id

      message.channel.send({
        embed: {
          color: "RANDOM",
          author: { name: `${message.guild.name}'s settings` },
          description: `[Invibe me!](https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot) | [Support Server](https://discord.link/owlvernyte) | [Vote me](https://top.gg/bot/853623967180259369)`,
          fields: [
            {
              name: `Prefix`,
              value: `${await message.guild.getPrefix() || bot.config.discord.prefix}`,
              inline: true,
            },
            {
              name: `Server ID`,
              value: `${guildId}`,
              inline: true,
            },
            {
              name: `Region`,
              value: `${message.guild.region}`,
              inline: true,
            },
          ],
          footer : { text: `Slimaeus#8878 || Fiezt#1492`},
          
        }
      });
    },
};
