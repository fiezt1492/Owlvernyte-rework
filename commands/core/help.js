const Discord = require("discord.js")
module.exports = {
  name: 'help',
  aliases: ['h'],
  description: "Help Panel",
  category: 'Core',
  utilisation: '{prefix}help <command name>',

  async execute(bot, message, args) {
    const guildId = message.guild.id
    const prefix = await message.guild.getPrefix() || bot.config.discord.prefix;

    if (!args[0]) {

      const eco = bot.commands.filter(x => x.category == 'Economy').map((x) => '`' + x.name + '`').join(', ');
      const fun = bot.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
      const util = bot.commands.filter(x => x.category == 'Utility').map((x) => '`' + x.name + '`').join(', ');
      const gambling = bot.commands.filter(x => x.category == 'Gambling').map((x) => '`' + x.name + '`').join(', ');
      const leveling = bot.commands.filter(x => x.category == 'Leveling').map((x) => '`' + x.name + '`').join(', ');

      message.lineReplyNoMention({
        embed: {
          color: 'RANDOM',
          author: { name: 'Help panel' },
          footer: { text: `Requested by ${message.author.tag} | Using ${prefix}help` },
          fields: [
            { name: 'Leveling', value: leveling ? leveling : "None" },
            { name: 'Economy', value: eco ? eco : "None" },
            { name: 'Gambling', value: gambling ? gambling : "None" },
            { name: 'Fun', value: fun ? fun : "None" },
            { name: 'Utility', value: util ? util : "None" },

          ],
          timestamp: new Date(),
          description: `You can use ${prefix}help + <command name> to have more information.\nYou can also mention me as a prefix.`,
        },
        components: [{
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: `Support Server`,
              url: `https://discord.link/owlvernyte`
            }
          ]
        }]
      });

    } else {
      const command = bot.commands.get(args.join(" ").toLowerCase()) || bot.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

      if (!command) return message.lineReplyNoMention(`I did not find this command !`);

      message.lineReplyNoMention({
        embed: {
          color: 'RANDOM',
          author: { name: 'Help panel' },
          footer: { text: `Requested by ${message.author.tag} | Using ${prefix}help ${command.name}` },
          fields: [
            { name: 'Name', value: command.name, inline: true },
            { name: 'Category', value: command.category, inline: true },
            { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
            { name: 'Utilisation', value: command.utilisation.replace('{prefix}', process.env.PREFIX), inline: true },
          ],
          timestamp: new Date(),
          description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
        },
        components: [{
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: `Support Server`,
              url: `https://discord.link/owlvernyte`
            }
          ]
        }]
      });

    };
  },


  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Get information about a specific command",
        value: "command",
        type: 3,
        required: false,
      },
    ],
    run: async (bot, interaction, args) => {
      const guild = bot.guilds.cache.get(interaction.guild_id)
      const prefix = await guild.getPrefix() || bot.config.discord.prefix;
      const Embed = new Discord.MessageEmbed()
      if (!args) {

        const eco = bot.commands.filter(x => x.category == 'Economy').map((x) => '`' + x.name + '`').join(', ');
        const fun = bot.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
        const util = bot.commands.filter(x => x.category == 'Utility').map((x) => '`' + x.name + '`').join(', ');
        const gambling = bot.commands.filter(x => x.category == 'Gambling').map((x) => '`' + x.name + '`').join(', ');
        const leveling = bot.commands.filter(x => x.category == 'Leveling').map((x) => '`' + x.name + '`').join(', ');

        Embed
        .setColor("RANDOM")
        .setAuthor('Help panel')
        .setFooter(`Requested by ${interaction.member.user.tag} | Using /help`)
        .addField('Leveling', leveling ? leveling : "None")
        .addField('Economy', eco ? eco : "None")
        .addField('Gambling', gambling ? gambling : "None")
        .addField('Fun', fun ? fun : "None")
        .addField('Utility', util ? util : "None")
        .setDescription(`**Server prefix**: \`${prefix}\`\nYou can use /help + <command> to have more information.\nYou can also mention me as a prefix.\n[Support Server](https://discord.link/owlvernyte)`)
        .setTimestamp()
        
        await interaction.send(Embed)

      } else {
        const command = bot.commands.get(args[0].value.toLowerCase()) || bot.commands.find(x => x.aliases && x.aliases.includes(args[0].value.toLowerCase()));

        if (!command) return interaction.send(`I cannot find \`${args[0].value.toLowerCase()}\`!`);

        Embed
        .setColor("RANDOM")
        .setAuthor('Help panel')
        .setFooter(`Requested by ${interaction.member.user.tag} | Using /help ${command.name}`)
        .addField('Name', command.name,true)
        .addField('Category', command.category,true)
        .addField('Aliase(s)', command.aliases.length < 1 ? 'None' : command.aliases.join(', '),true)
        .addField('Utilisation', command.utilisation.replace('{prefix}', prefix),true)
        .setDescription('Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.\n[Support Server](https://discord.link/owlvernyte)')
        .setTimestamp()

        await interaction.send(Embed);

      };
    },
  }
};
