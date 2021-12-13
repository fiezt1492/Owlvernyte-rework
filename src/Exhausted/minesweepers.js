const Minesweeper = require("discord.js-minesweeper")

module.exports = {
  name: 'minesweepers',
  aliases: ['minesweeper', 'ms'],
  category: 'Fun',
  utilisation: '{prefix}minesweepers',

  async execute(bot, message, args) {
    const difficulty = args[0]
    let rows;
    let columns;
    let mines;

    switch (difficulty) {
      case "introduction":
      case "intro":
        rows = 8
        columns = 8
        mines = 10
        break;

      case "intermediate":
      case "inter":
        rows = 16
        columns = 16
        mines = 40
        break;

      case "expert":
      case "e":
        rows = 16
        columns = 30
        mines = 99
        break;

      default:
        rows = parseInt(args[0]);
        columns = parseInt(args[1]);
        mines = parseInt(args[2]);
    }

    const guildId = message.guild.id
    const prefix = await message.guild.getPrefix() || bot.config.discord.prefix;

    if (!rows || !columns || !mines) return message.lineReplyNoMention(`**[ERROR]** Wrong provides. You can select \`introduction\`, \`intermediate\`, \`expert\` or enter custom integer by this format: \`[rows] [columns] [mines]\`.\nExample: \`${prefix}ms 8 8 10\``)

    const minesweeper = new Minesweeper({
      rows: rows,
      columns: columns,
      mines: mines,
      emote: 'bomb',
    });
    const matrix = minesweeper.start();

    return matrix
      ? message.lineReplyNoMention(matrix).catch(() => message.lineReplyNoMention("**[ERROR]** More than 2000 characters length. Please try another"))
      : message.lineReplyNoMention(':warning: You have provided invalid data.');

  },
};