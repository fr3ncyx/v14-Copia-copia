const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const memberSchema = require("../../Models/Membercount");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-membercount")
    .setDescription("system of membercount")
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("set channel to membercount")
        .setRequired(true)
    )
    .addChannelOption(option =>
        option.setName("channel1")
        .setDescription("set channel to membercount")
        .setRequired(true)
    )
    .addChannelOption(option =>
        option.setName("channel2")
        .setDescription("set channel to membercount")
        .setRequired(true)
    ),

    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel")
        const channel1 = options.getChannel("channel1")
        const channel2 = options.getChannel("channel2")

        memberSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await memberSchema.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                    Channel1: channel1.id,
                    Channel2: channel2.id
                });
            }
            interaction.reply({content: 'Creato con successo un membercount', ephemeral: true});
        })
    }
}