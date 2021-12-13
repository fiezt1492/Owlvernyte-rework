module.exports = (bot, guild) => {
  require("../util/RegisterSlashCommands")(bot, guild.id);
};