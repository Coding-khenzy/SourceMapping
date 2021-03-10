// import needed modules 
const Discord = require('discord.js')

module.exports = {
    name: 'say',
    commands: 'say',
    category: 'Moderation',
    description: 'Sends an announce embed.',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: 'Incorrect Syntax use: !say  <title> <message> <image> <color> <@everyone>',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({ message, args }) => {
        message.delete()
        // get the target channel

        const targetChannel = message.mentions.channels.first()
        if (!targetChannel) {
            message.reply('Please specify a channel to send the embed in.').then((msg) => msg.delete({ timeout: 3000 }))
        }

        args.shift() // remove channel mention
        // get the json data

        
        try { 
            const json = JSON.parse(args.join(' '))
            const { text = '' } = json
            // send the embed
            targetChannel.send(text, {
                embed: json
        })
        } catch (error) {
            message.reply(`Invalid JSON ${error.message}`)
        }
    }
}
