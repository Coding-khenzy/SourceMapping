const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

// Init Discord Client

const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
    const messagesPath = ''

    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindandModify: false,
    }

    const disabledDefaultCommands = [
        'command',
        'language',
        'requiredrole'
    ]

    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        messagesPath,
        showWarns: true,
        dbOptions,
        disabledDefaultCommands
    })
    .setDefaultPrefix('!')
    .setColor(0x99DEFF)
})

client.login(process.env.TOKEN)