const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-logs")
        .setDescription("Seleziona il tuo canale dei log")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Canale dei log")
                .setRequired(false)
        ),

    async execute(interaction) {
        const { options, guildId, channel } = interaction;

        const logChannel = options.getChannel("channel") || channel;
        const embed = new EmbedBuilder();

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("I dati sono stati mandati con successo al database")
                    .setColor("Green")
                    .setTimestamp()
            } else if (data) {
                logSchema.findOneAndDelete({ Guild: guildId });
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription("I vecchi dati sono stati rimpiazzati con successo con i nuovi")
                    .setColor("Green")
                    .setTimestamp()
            }

            if (err) {
                embed.setDescription("Qualcosa è andato storto. Per favore contatta gli sviluppatori")
                .setColor("Red")
                .setTimestamp();
            }

            return interaction.reply({embeds: [embed], ephemeral: true})
        })
    }
}