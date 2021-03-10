// import needed modules
const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    commands: 'kick',
    category: 'Moderation',
    description: 'Kicks a user from the Server',
    minArgs: 1,
    syntaxError: 'Incorrect Syntax use: !kick <@target>',
    requiredPermissions: ['KICK_MEMBERS'],
    callback: ({ message, args }) => {
        message.delete()
        //get member object 
        const target = message.mentions.users.first()

        if (!target) {
            message.reply('Please tag someone to kick').then( (msg) => msg.delete({ timeout: 3000 }))
            return
        }

        const { guild } = message
        const targetMember = guild.members.cache.get(target.id)
        //kick member object

        if (targetMember.kickable) {
            targetMember.kick()
        } else {
            message.reply(`I cannot kick this user.\nID: ${target.id}`).then( (msg) => msg.delete({ timeout: 3000 }))
        }
        //log kicked user in log channel

        const logChannel = guild.channels.cache.get('810590641225465937')

        const kickEmbed = new Discord.MessageEmbed()
        .setColor('#F8A439')
        .addField('Kicked user', target, true)
        .addField('Admin', message.author, true)
        .addField('Reason', args[1], false)
        .setThumbnail(target.displayAvatarURL())
        .setTimestamp()

        logChannel.send({ embed: kickEmbed })
    }
}