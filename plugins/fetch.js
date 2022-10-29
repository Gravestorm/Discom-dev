const nconf = require('nconf')
const fetch = require('request-promise')
const fs = require('node:fs')
const promise = require('bluebird')
const delay = ms => new promise(resolve => setTimeout(resolve, ms))

const req = async (data, i) => {
  console.log('d', i, data[i].N)
  let uris = [`https://discord.com/api/v9/guilds/78581046714572800/messages/search?author_id=${data[i].ID}&channel_id=78581046714572800&channel_id=364081918116888576&channel_id=626165608010088449&channel_id=534121764045717524&channel_id=297780920268750858`,
  `https://discord.com/api/v9/guilds/78581046714572800/messages/search?author_id=${data[i].ID}&channel_id=297779639609327617&channel_id=364086525799038976&channel_id=626165637252907045&channel_id=534121863857569792&channel_id=372100313890553856`,
  `https://discord.com/api/v9/guilds/78581046714572800/messages/search?author_id=${data[i].ID}&channel_id=297779810279751680&channel_id=356038271140233216&channel_id=299523503592439809&channel_id=297809615490383873&channel_id=297779846187188234&channel_id=892471107318345749&channel_id=582715083537514526&channel_id=297779010417590274&channel_id=678244173006241842`,
  `https://discord.com/api/v9/guilds/78581046714572800/messages/search?mentions=${data[i].ID}`]
  for (let j = 0; j < uris.length; j++) {
    await delay(6000)
    await fetch({ url: uris[j], headers: { Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8', Authorization: nconf.get('USER2'), Connection: 'close', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42' } }).then(res => {
      if (j === 0) data[i].EN = JSON.parse(res).total_results
      if (j === 1) data[i].FR = JSON.parse(res).total_results
      if (j === 2) data[i].OT = JSON.parse(res).total_results
      if (j === 3) data[i].P = JSON.parse(res).total_results
    }).catch(err => { throw err })
  }
}

module.exports = (client) => {
  if (!nconf.get('USER22') || !nconf.get('SERVER') || !nconf.get('ROLE_IRON') || !nconf.get('ROLE_COPPER') || !nconf.get('ROLE_BRONZE') || !nconf.get('ROLE_SILVER') || !nconf.get('ROLE_GOLD') || !nconf.get('ROLE_CRYSTAL') || !nconf.get('ROLE_DIAMOND') || !nconf.get('ROLE_LEGEND') || !nconf.get('ROLE_EPIC') || !nconf.get('ROLE_OMEGA')) return
  const iron = nconf.get('ROLE_IRON')
  const copper = nconf.get('ROLE_COPPER')
  const bronze = nconf.get('ROLE_BRONZE')
  const silver = nconf.get('ROLE_SILVER')
  const gold = nconf.get('ROLE_GOLD')
  const crystal = nconf.get('ROLE_CRYSTAL')
  const diamond = nconf.get('ROLE_DIAMOND')
  const legend = nconf.get('ROLE_LEGEND')
  const epic = nconf.get('ROLE_EPIC')
  const omega = nconf.get('ROLE_OMEGA')
  const data = JSON.parse(fs.readFileSync('data.json'))
  console.log(data.length)
  //for (let i = 0; i < data.length; i++) { delete data[i].X }
  //fs.writeFileSync('data.json', JSON.stringify(data))
  client.guilds.fetch(nconf.get('SERVER')).then(g => g.members.fetch({ force: true }).then(m => m.forEach(m => {
    if (!data.find(d => d.ID === m.id)) data.push({ ID: m.id, EN: 0, FR: 0, OT: 0, T: 99, P: 0, M: 0, R: 0, N: m.displayName.replace('"', ''), C: m.user.createdTimestamp, U: '2022-07-01' })
  }))).then(() => { data.sort((a, b) => { return Number(a.ID) - Number(b.ID) }) }).then(async () => {
    console.log(data.length)
    client.guilds.fetch(nconf.get('SERVER')).then(async g => {
      for (let i = 0; i < data.length; i++) {
        console.log('a', i)
        let user = g.members.resolve(data[i].ID)
        //if (!user) { console.log(i, data[i].ID, data[i].N); continue }
        if (!user) { console.log('b', i, data[i].ID, data[i].N); data.splice(i, 1); fs.writeFileSync('data.json', JSON.stringify(data)); i - 1; continue }
        data[i].N = user.displayName.replace('"', '')
        if (data[i].X === true) continue // || Date.parse(new Date().toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })) - Date.parse(data[i].U) < 86400000
        if (data.length < 16000) throw data.length
        await delay(6000)
        await fetch({ url: `https://discord.com/api/v9/guilds/78581046714572800/messages/search?author_id=${data[i].ID}&channel_id=78581046714572800&channel_id=364081918116888576&channel_id=626165608010088449&channel_id=534121764045717524&channel_id=297780920268750858&channel_id=297779639609327617&channel_id=364086525799038976&channel_id=626165637252907045&channel_id=534121863857569792&channel_id=372100313890553856&channel_id=297779810279751680&channel_id=356038271140233216&channel_id=299523503592439809&channel_id=297809615490383873&channel_id=297779846187188234&channel_id=892471107318345749&channel_id=582715083537514526&channel_id=297779010417590274&channel_id=678244173006241842`, headers: { Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.9,lt;q=0.8', Authorization: nconf.get('USER2'), Connection: 'close', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42' } }).then(async res => {
          console.log('c', i, data[i].ID, data[i].N, JSON.parse(res).total_results)
          data[i].U = new Date().toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })
          if (JSON.parse(res).total_results === 0) data[i].T = data[i].EN = data[i].FR = data[i].OT = 0
          if (JSON.parse(res).total_results !== data[i].T || JSON.parse(res).total_results !== data[i].EN + data[i].FR + data[i].OT) data[i].T = JSON.parse(res).total_results, await req(data, i)
          data[i].M = Number(data[i].T / ((Date.parse(new Date().toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })) - Date.parse(new Date(data[i].C).toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }))) / 86400000))
          data[i].X = true
          fs.writeFileSync('data.json', JSON.stringify(data))

          const d = data[i].T
          switch (true) {
            case d < 50:
              [iron, copper, bronze, silver, gold, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) }); break
            case d >= 50 && d < 100:
              [copper, bronze, silver, gold, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(iron)) user.roles.add(iron); break
            case d >= 100 && d < 250:
              [iron, bronze, silver, gold, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(copper)) user.roles.add(copper); break
            case d >= 250 && d < 500:
              [iron, copper, silver, gold, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(bronze)) user.roles.add(bronze); break
            case d >= 500 && d < 1000:
              [iron, copper, bronze, gold, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(silver)) user.roles.add(silver); break
            case d >= 1000 && d < 2500:
              [iron, copper, bronze, silver, crystal, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(gold)) user.roles.add(gold); break
            case d >= 2500 && d < 5000:
              [iron, copper, bronze, silver, gold, diamond, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(crystal)) user.roles.add(crystal); break
            case d >= 5000 && d < 10000:
              [iron, copper, bronze, silver, gold, crystal, legend, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(diamond)) user.roles.add(diamond); break
            case d >= 10000 && d < 25000:
              [iron, copper, bronze, silver, gold, crystal, diamond, epic, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(legend)) user.roles.add(legend); break
            case d >= 25000 && d < 50000:
              [iron, copper, bronze, silver, gold, crystal, diamond, legend, omega].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(epic)) user.roles.add(epic); break
            case d >= 50000:
              [iron, copper, bronze, silver, gold, crystal, diamond, legend, epic].some(r => { if (user.roles.cache.has(r)) user.roles.remove(r) })
              if (!user.roles.cache.has(omega)) user.roles.add(omega); break
            default: break
          }
        }).catch(err => { throw err })
      }
      //for (let i = 0; i < data.length; i++) { delete data[i].X }
      //fs.writeFileSync('data.json', JSON.stringify(data))
      console.log('+')
    })
  })
}
// ID - EN/English - FR/French - OT/Other - T/Total - P/Pings - M/AverageMessagesPerDaySinceAccountCreation - R/OverallRank - N/Name - A/Avatar - C/AccountCreationDate - U/StatsLastUpdated
// 100 - 500 - 1000 - 2500 - 5000 - 10000 - 50000 - 100000