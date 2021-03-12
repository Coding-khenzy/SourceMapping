const express = require('express')
const server = express();


server.all('/', (req, res) => {
  res.send('Host online')
})

function keepAlive() {
  server.listen(3000, () => {
    console.log('Server is ready')
  })
}


const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
const iconUrl = 'https://cdn.discordapp.com/attachments/792514708681785344/792881246018863134/pluscheck.png'
const fs = require('fs')

const axios = require('axios')
const members = require('./member.js')
// Init Discord Client

const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {

  members(client);


  const messagesPath = ''

  
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
  .setCategorySettings([
      {
        name: 'Fun',
        emoji: '🎮'
      }
  ])
  

  // Calling features
    
    
})

console.log('Checking for newest CSS Maps is running.')
async function checkMap () {
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
    let latestmap = {}
    
    try {
        const jsonString = fs.readFileSync("./maps.json");
        const obj = JSON.parse(jsonString);
        latestmap = obj
    } catch (err) {
        console.log(err);
        return;
    }

   
    if (latestmap['Map Name'] == entry['Map Name']) {
        console.log('Map already posted.')
        return
    } else {
        console.log(`Posting map: ${entry['Map Name']}`)

        let data = JSON.stringify(entry, null, 2)
        fs.writeFile('maps.json', data, 'utf-8', (err) => {
        if (err) throw err; 
        channel.send('', { embed: cssEmbed })
        })

        return
    }
    
    
    
}

setInterval(checkMap, 900000)
keepAlive()
client.login(process.env.TOKEN)