// import needed modules 
const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    commands: 'ban',
    category: 'Moderation',
    description: 'Bans a user from the Server',
    minArgs: 1,
    syntaxError: 'Incorrect Syntax use: !ban <@target> reason',
    requiredPermissions: ['BAN_MEMBERS'],
    callback: ({ message, args }) => {
        message.delete()

        //get member object
        const target = message.mentions.users.first()

        if (!target) {
            message.reply('Please tag someone to ban').then( (msg) => msg.delete({ timeout: 3000 }))
            return
        }

        const { guild } = message
        const targetMember = guild.members.cache.get(target.id)

        //ban member object 

        if (targetMember.bannable) {
            targetMember.ban()
        } else {
            message.reply(`I cannot ban this user.\nID: ${target.id}`).then( (msg) => msg.delete({ timeout: 3000 }))
        }

        //log kicked user in log chanel

        const logChannel = guild.channels.cache.get('810590641225465937')

        const banEmbed = new Discord.MessageEmbed()
        .setColor('#F8A439')
        .addField('Banned user', target, true) 
        .addField('Admin', message.author, true)
        .addField('Reason', args[1], false)
        .setThumbnail(targeat.displayAvatarURL())
        .setTimestamp()


        logChannel.send({ embed: banEmbed })
        
    }
}