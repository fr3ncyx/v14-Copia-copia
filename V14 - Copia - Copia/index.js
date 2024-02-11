const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
  ActivityType,
} = require("discord.js");
const YoutubePoster = require("discord-youtube");
const logs = require("discord-logs")

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { handleLogs } = require("./Handlers/handleLogs");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
})

client.ytp = new YoutubePoster(client,{
  loop_delay_in_min: 1
});
client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  handleLogs(client);
  loadEvents(client);
  loadCommands(client);
});

module.exports = client;

client.on(Events.GuildMemberAdd, async (member) => {
  const role = await db.get(`autorole_${member.guild.id}`);
  const giveRole = await member.guild.roles.cache.get(role);

  member.roles.add(giveRole);
});

client.on("ready", () => {
  client.user.setActivity("https://discord.gg/Tb7K7TqF7y", { type: ActivityType.Watching });
});

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1064251646827311185";
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});
