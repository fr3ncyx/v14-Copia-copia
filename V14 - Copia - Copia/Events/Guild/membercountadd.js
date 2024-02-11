const client = require("../../index");
const memberSchema = require("../../Models/Membercount");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {
        memberSchema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let channel1 = data.Channel1;
            let channel2 = data.Channel2;

            const {user, guild} = member;
            const memberChannel = member.guild.channels.cache.get(data.Channel);
            const memberChannel1 = member.guild.channels.cache.get(data.Channel1);
            const memberChannel2 = member.guild.channels.cache.get(data.Channel2);

            memberChannel.setName(`Total: ${member.guild.memberCount}`)
            memberChannel1.setName(`Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
            memberChannel2.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        })
    }
}