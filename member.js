module.exports = client => {
    const channelId = '810595755026546698';

    const updateMember = guild => {
        const channel = guild.channels.cache.get(channelId);
        channel.setName(`User Count: ${guild.memberCount.toLocaleString()}`);

    }

    client.on('guildMemberAdd', member => updateMember(member.guild));
    client.on('guildMemberRemove', member => updateMember(member.guild));

    const guild = client.guilds.cache.get('772481667432448010');
    updateMember(guild);
}