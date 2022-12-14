const { EmbedBuilder } = require('discord.js')
const cheerio = require('cheerio')
const fetch = require('request-promise')
const fs = require('node:fs')
const nconf = require('nconf')
const random = require('randomcolor')
const almanax = JSON.parse(fs.readFileSync('almanax.json'))

module.exports = async (client) => {
  if (!nconf.get('CHANNEL_ALMANAX')) return
  setInterval(() => {
    client.channels.fetch(nconf.get('CHANNEL_ALMANAX')).then(c => c.messages.fetch({ limit: 1, cache: false }).then(m => {
      if (m.last()?.embeds[0].data.title.substring(2, 12) === new Date().toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })) return
      m.last()?.delete()
      fetch({ url: `https://www.krosmoz.com/en/almanax?game=dofus`, encoding: 'utf8', transform: (body) => { return cheerio.load(body) } }).then(($) => {
        let d = almanax.find(d => $('#achievement_dofus .mid .more .more-infos p').first().text().trim().replace('Quest: Offering for ', '') === d.N)
        client.channels.fetch(nconf.get('CHANNEL_ALMANAX')).then(c => c.send({ embeds: [new EmbedBuilder().setTitle(`**${new Date().toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })} | ${d.N} | ${d.R}**`).setDescription(`**Objet:** ${d.IFR}\n${d.BFR}\n\n\n**Item:** ${d.IEN}\n${d.BEN}`).setImage(d.I).setColor(random())] }).then(m => m.crosspost()))
      }).catch(err => { throw err })
    }))
  }, 300000) // 300000 = 5 minutes
}