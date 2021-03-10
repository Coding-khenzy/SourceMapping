const axios = require('axios')
const Discord = require('discord.js')
const iconUrl = 'https://cdn.discordapp.com/attachments/792514708681785344/792881246018863134/pluscheck.png'
const fs = require('fs')
let latestMap = require('./maps.json')

module.exports = async (client) => {
    console.log('Checking for newest CSS Maps is running.')

    const guild = client.guilds.cache.get('772481667432448010')
    const channel = guild.channels.cache.get('818889412028792832')

    // get API response
    let cssResponse = await axios.get('https://gamebanana.com/maps/cats/2976?api=SubmissionsListModule')

    // store important values
    let userName = cssResponse.data['_aCellValues'][0]['_aOwner']['_sUsername'];
    let mapLink = cssResponse.data['_aCellValues'][0]['_sProfileUrl'];
    let mapName = cssResponse.data['_aCellValues'][0]['_sName'];

    let entry = { 
        'Map Name': mapName
    }

    

    // Image Embed

    let mapId = mapLink.replace('https://gamebanana.com/maps/', '')
    let mapImageEmbedLink = `https://gamebanana.com/maps/embeddables/${mapId}?type=large`

    // create embed 

    let cssEmbed = new Discord.MessageEmbed()
    .setColor('#5CEB77')
    .setTitle(`${mapName} by ${userName}`)
    .addField('Download', mapLink)
    .setImage(mapImageEmbedLink)
    .setTimestamp()
    .setFooter(`New map by: ${userName}`, iconUrl)

    // check if map has been posted -> do nothing else post map
    
    if (entry['Map Name'] === latestMap['Map Name']) {
        console.log('Map already Posted')
        console.log(`Loaded map: ${latestMap['Map Name']}`)
        return
        
    } else {
        console.log(`Posting map: ${entry['Map Name']}`)

        let data = JSON.stringify(entry, null, 2)
        fs.writeFile('maps.json', data, 'utf-8', (err) => {
        if (err) throw err; 

        channel.send({ embed: cssEmbed })

        return
    })
    }
    

    
    

    

}

