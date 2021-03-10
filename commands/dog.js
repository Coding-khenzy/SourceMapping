const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
    name: 'dog',
    commands: 'dog',
    category: 'Fun',
    description: 'Shows a random picture of a dog',
    cooldown: '30s',
    callback: async ({ message }) => {

        // deleting command message itself
        message.delete()

        // fetch image
        let dogResponse = await axios.get('https://random.dog/woof.json ')
        let dogImage = dogResponse.data['url']
        
        // create embed
        let dogEmbed = new Discord.MessageEmbed()
        .setColor('#5CEB77')
        .setImage(dogImage)
        .setTimestamp()
        .setTitle('Look a this doggo!')

        // send embed
        message.channel.send({ embed: dogEmbed })
        
    }
}