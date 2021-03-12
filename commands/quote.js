const axios = require('axios')
const Discord = require('discord.js')

module.exports = {
    name: 'quote',
    commands: 'quote',
    category: 'Fun',
    description: 'Gives you a random quote',
    cooldown: '30s',
    callback: async ({ message }) => {

        // fetch image
        let quoteResponse = await axios.get('https://goquotes-api.herokuapp.com/api/v1/random?count=1')
        let quoteText = quoteResponse.data['quotes'][0]['text']
        let quoteAuthor = quoteResponse.data['quotes'][0]['author']
        let quoteTag = quoteResponse.data['quotes'][0]['tag']
        //create embed
        let quoteEmbed = new Discord.MessageEmbed()
        .setColor('#5CEB77')
        .setAuthor(`Author: ${quoteAuthor}`)
        .addField('Quote', quoteText)
        .setTimestamp()
        .setFooter(quoteTag)

        //send embed
        message.channel.send({ embed: quoteEmbed })
    }
}