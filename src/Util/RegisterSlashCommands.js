const fs = require("fs");
const path = require("path");

/**
 * Register slash commands for a guild
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {string} guild
 */
module.exports = (client, guild) => {
  console.log("Registering SlashCommands for " + guild)

  let commandsDir = path.join(__dirname, "../..", "commands");

  fs.readdir(commandsDir, (e, folders) => {
    if (e) throw e;

    folders.forEach(async (folder) => {
      fs.readdir(commandsDir + "/" + folder, (err, files) => {
        if (err) throw err;

        files.forEach(async (file) => {
          let cmd = require(commandsDir + "/" + folder + "/" + file);
          if (!cmd.SlashCommand || !cmd.SlashCommand.run) return;
          // console.log(cmd)
          let dataStuff = {
            name: cmd.name,
            description: cmd.description,
            options: cmd.SlashCommand.options,
          };

          //Creating variables like this, So you might understand my code :)
          let ClientAPI = client.api.applications(client.user.id);
          let GuildAPI = ClientAPI.guilds(guild);

          console.log(
            "[Slash Command]: [POST] Guild " +
            guild +
            ", Command: " +
            dataStuff.name
          );
          try {
            await GuildAPI.commands.post({ data: dataStuff });
          } catch (e) {
            console.log(
              "[Slash Command]: [POST-FAILED] Guild " +
              guild +
              ", Command: " +
              dataStuff.name
            );
            console.log(e);
          }
        });
      });
    })
  })
}
