const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler")
const { loadEvents } = require("../../Handlers/eventHandler")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("ricarica eventi/comandi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => 
    options
    .setName("events")
    .setDescription("ricarica i tuoi eventi"))
    .addSubcommand((options) => 
    options
    .setName("commands")
    .setDescription("ricarica i tuoi comandi")),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case "events": {
                loadEvents(client)
                interaction.reply({ content: "Eventi ricaricati", ephemeral: true})
            }
            break;
            case "commands" : {
                loadCommands(client)
                await interaction.reply({ content: "Comandi ricaricati", ephemeral: true})
            }
            break;
        }
    }

}