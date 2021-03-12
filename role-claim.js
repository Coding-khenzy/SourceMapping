const firstMessage = require('./first-message')
const Discord = require('discord.js')
module.exports = (client) => {
    const rankedRoles = new Discord.MessageEmbed()
    .setTitle('Avaiable Roles.')
    .setColor('#98ff91')
    .addField('Developer Roles', 'Choose your coding language.')
    .addField('JavaScript', '<:javascript:795790894812889098>', true)
    .addField('Python', '<:python:795790894854701067>', true)
    .addField('C++', '<:cpp:795790894748925982>')
    .addField('Notification Settings', 'Latest CSS maps.', true)
    .addField('CSS New - Maps', '<:notify:820030095660941323>', false)
    .setFooter('SourceMapping')
    .setThumbnail('https://cdn.discordapp.com/attachments/792514708681785344/820030501825544232/sourcemapping.png')
    const channelId = '820028770194685983'

    const emojis = {
        javascript: 'JavaScript',
        python: 'Python',
        cpp: 'Cpp',
        notify: 'New Maps Notification'
    }

    const reactions = ['795790894812889098', '795790894854701067', '795790894748925982', '820030095660941323']


    firstMessage(client, channelId, rankedRoles, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.id === '773248369199415329') {
        return
        }

        const emoji = reaction._emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) {
        return
        }

        const role = guild.roles.cache.find((role) => role.name === roleName)
        const member = guild.members.cache.find((member) => member.id === user.id)

        if (add) {
        member.roles.add(role)
        } else {
        member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, true)
        }
    })
    }