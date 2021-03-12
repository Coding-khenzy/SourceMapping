const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
    name: 'cat',
    commands: 'cat',
    category: 'Fun',
    description: 'Shows a random picture of a cat',
    cooldown: '30s',
    callback: async ({ message }) => {

        // fetch image
        let catResponse = await axios.get('http://aws.random.cat/meow')
        let catImage = catResponse.data['file']

        //create embed
        let catEmbed = new Discord.MessageEmbed()
        .setColor('#5CEB77')
        .setImage(catImage)
        .setTimestamp()
        .setTitle('Look at this cat!')

        //send embed
        message.channel.send({ embed: catEmbed })
    }
}