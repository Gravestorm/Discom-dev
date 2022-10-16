const { EmbedBuilder } = require('discord.js')
const cron = require('cron').CronJob
const fetch = require('request-promise')
const fs = require('node:fs')
const nconf = require('nconf')
const promise = require('bluebird')
const random = require('randomcolor')
const delay = ms => new promise(resolve => setTimeout(resolve, ms))

module.exports = async (client) => {
  if (!nconf.get('CHANNEL_LEADERBOARD') || !nconf.get('USER1')) return
  new cron({
    cronTime: '00 00 00 1 * *',
    onTick: async () => {
      const data = JSON.parse(fs.readFileSync('data.json'))
      let tT = tEN = tFR = tOT = tC = tM = tP = tR = ''
      let serverT = serverEN = serverFR = serverOT = totalT = totalEN = totalFR = totalOT = 0
      let user0 = user1 = user10 = user100 = userEN = userFR = userOT = userENFR = userALL = 0
      let uris = ['https://discord.com/api/v9/guilds/78581046714572800/messages/search?channel_id=78581046714572800&channel_id=364081918116888576&channel_id=626165608010088449&channel_id=534121764045717524&channel_id=297780920268750858',
        'https://discord.com/api/v9/guilds/78581046714572800/messages/search?channel_id=297779639609327617&channel_id=364086525799038976&channel_id=626165637252907045&channel_id=534121863857569792&channel_id=372100313890553856',
        'https://discord.com/api/v9/guilds/78581046714572800/messages/search?channel_id=297779810279751680&channel_id=356038271140233216&channel_id=299523503592439809&channel_id=297809615490383873&channel_id=297779846187188234&channel_id=892471107318345749&channel_id=582715083537514526&channel_id=297779010417590274&channel_id=678244173006241842',
        'https://discord.com/api/v9/guilds/78581046714572800/messages/search?channel_id=78581046714572800&channel_id=364081918116888576&channel_id=626165608010088449&channel_id=534121764045717524&channel_id=297780920268750858&channel_id=297779639609327617&channel_id=364086525799038976&channel_id=626165637252907045&channel_id=534121863857569792&channel_id=372100313890553856&channel_id=297779810279751680&channel_id=356038271140233216&channel_id=299523503592439809&channel_id=297809615490383873&channel_id=297779846187188234&channel_id=892471107318345749&channel_id=582715083537514526&channel_id=297779010417590274&channel_id=678244173006241842']

      await data.sort((a, b) => { return Number(b.T) - Number(a.T) })
      for (let i = 0; i < data.length; i++) {
        if (data[i].T === 0) user0++
        if (data[i].T > 0 && data[i].T < 11) user1++
        if (data[i].T > 10 && data[i].T < 100) user10++
        if (data[i].T > 99) user100++
        if (data[i].EN > 0 && data[i].FR === 0) userEN++
        if (data[i].EN === 0 && data[i].FR > 0) userFR++
        if (data[i].EN === 0 && data[i].FR === 0 && data[i].OT > 0) userOT++
        if (data[i].EN > 0 && data[i].FR > 0) userENFR++
        if (data[i].EN > 0 && data[i].FR > 0 && data[i].OT > 0) userALL++
        totalT += data[i].T
        data[i].R += i + 1
        if (i === 0) tT += `1️⃣ [1;2m[1;31m${data[i].T}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tT += `2️⃣ [1;34m${data[i].T}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tT += `3️⃣ [1;35m${data[i].T}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tT += `4️⃣ [1;33m${data[i].T}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tT += `5️⃣ [1;33m${data[i].T}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tT += `6️⃣ [1;32m${data[i].T}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tT += `7️⃣ [1;32m${data[i].T}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tT += `8️⃣ [1;32m${data[i].T}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tT += `9️⃣ [1;32m${data[i].T}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tT += `🔟 [1;32m${data[i].T}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tT += `#️⃣ [1;36m${data[i].T}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return Number(b.EN) - Number(a.EN) })
      for (let i = 0; i < data.length; i++) {
        totalEN += data[i].EN
        data[i].R += i + 1
        if (i === 0) tEN += `1️⃣ [1;2m[1;31m${data[i].EN}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tEN += `2️⃣ [1;34m${data[i].EN}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tEN += `3️⃣ [1;35m${data[i].EN}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tEN += `4️⃣ [1;33m${data[i].EN}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tEN += `5️⃣ [1;33m${data[i].EN}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tEN += `6️⃣ [1;32m${data[i].EN}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tEN += `7️⃣ [1;32m${data[i].EN}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tEN += `8️⃣ [1;32m${data[i].EN}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tEN += `9️⃣ [1;32m${data[i].EN}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tEN += `🔟 [1;32m${data[i].EN}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tEN += `#️⃣ [1;36m${data[i].EN}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return Number(b.FR) - Number(a.FR) })
      for (let i = 0; i < data.length; i++) {
        totalFR += data[i].FR
        data[i].R += i + 1
        if (i === 0) tFR += `1️⃣ [1;2m[1;31m${data[i].FR}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tFR += `2️⃣ [1;34m${data[i].FR}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tFR += `3️⃣ [1;35m${data[i].FR}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tFR += `4️⃣ [1;33m${data[i].FR}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tFR += `5️⃣ [1;33m${data[i].FR}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tFR += `6️⃣ [1;32m${data[i].FR}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tFR += `7️⃣ [1;32m${data[i].FR}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tFR += `8️⃣ [1;32m${data[i].FR}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tFR += `9️⃣ [1;32m${data[i].FR}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tFR += `🔟 [1;32m${data[i].FR}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tFR += `#️⃣ [1;36m${data[i].FR}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return Number(b.OT) - Number(a.OT) })
      for (let i = 0; i < data.length; i++) {
        totalOT += data[i].OT
        data[i].R += i + 1
        if (i === 0) tOT += `1️⃣ [1;2m[1;31m${data[i].OT}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tOT += `2️⃣ [1;34m${data[i].OT}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tOT += `3️⃣ [1;35m${data[i].OT}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tOT += `4️⃣ [1;33m${data[i].OT}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tOT += `5️⃣ [1;33m${data[i].OT}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tOT += `6️⃣ [1;32m${data[i].OT}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tOT += `7️⃣ [1;32m${data[i].OT}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tOT += `8️⃣ [1;32m${data[i].OT}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tOT += `9️⃣ [1;32m${data[i].OT}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tOT += `🔟 [1;32m${data[i].OT}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tOT += `#️⃣ [1;36m${data[i].OT}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return Number(a.C) - Number(b.C) })
      for (let i = 0; i < data.length; i++) {
        let dat = new Date(data[i].C).toLocaleString('LT', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' })
        if (i === 0) tC += `1️⃣ [1;2m[1;31m${dat}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tC += `2️⃣ [1;34m${dat}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tC += `3️⃣ [1;35m${dat}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tC += `4️⃣ [1;33m${dat}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tC += `5️⃣ [1;33m${dat}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tC += `6️⃣ [1;32m${dat}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tC += `7️⃣ [1;32m${dat}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tC += `8️⃣ [1;32m${dat}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tC += `9️⃣ [1;32m${dat}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tC += `🔟 [1;32m${dat}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tC += `#️⃣ [1;36m${dat}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return b.M - a.M })
      for (let i = 0; i < data.length; i++) {
        data[i].R += i + 1
        if (i === 0) tM += `1️⃣ [1;2m[1;31m${(data[i].M).toFixed(2)}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tM += `2️⃣ [1;34m${(data[i].M).toFixed(2)}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tM += `3️⃣ [1;35m${(data[i].M).toFixed(2)}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tM += `4️⃣ [1;33m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tM += `5️⃣ [1;33m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tM += `6️⃣ [1;32m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tM += `7️⃣ [1;32m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tM += `8️⃣ [1;32m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tM += `9️⃣ [1;32m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tM += `🔟 [1;32m${(data[i].M).toFixed(2)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tM += `#️⃣ [1;36m${(data[i].M).toFixed(2)}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return b.P - a.P })
      for (let i = 0; i < data.length; i++) {
        data[i].R += i + 1
        data[i].R = data[i].R / 6
        if (i === 0) tP += `1️⃣ [1;2m[1;31m${data[i].P}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tP += `2️⃣ [1;34m${data[i].P}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tP += `3️⃣ [1;35m${data[i].P}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tP += `4️⃣ [1;33m${data[i].P}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tP += `5️⃣ [1;33m${data[i].P}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tP += `6️⃣ [1;32m${data[i].P}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tP += `7️⃣ [1;32m${data[i].P}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tP += `8️⃣ [1;32m${data[i].P}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tP += `9️⃣ [1;32m${data[i].P}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tP += `🔟 [1;32m${data[i].P}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tP += `#️⃣ [1;36m${data[i].P}[0m ${data[i].N}\n`
      }

      await data.sort((a, b) => { return a.R - b.R })
      for (let i = 0; i < 20; i++) {
        if (i === 0) tR += `1️⃣ [1;2m[1;31m${(data[i].R).toFixed(1)}[0m [1;37m<<< [0m[1;31m${data[i].N}[0m [1;37m>>>[0m\n`
        if (i === 1) tR += `2️⃣ [1;34m${(data[i].R).toFixed(1)}[0m [1;37m<<[0m [1;34m${data[i].N}[0m [1;37m>>[0m\n`
        if (i === 2) tR += `3️⃣ [1;35m${(data[i].R).toFixed(1)}[0m [1;37m<[0m [1;35m${data[i].N}[0m [1;37m>[0m\n`
        if (i === 3) tR += `4️⃣ [1;33m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 4) tR += `5️⃣ [1;33m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;33m${data[i].N}[0m [1;37m][0m\n`
        if (i === 5) tR += `6️⃣ [1;32m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 6) tR += `7️⃣ [1;32m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 7) tR += `8️⃣ [1;32m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 8) tR += `9️⃣ [1;32m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n`
        if (i === 9) tR += `🔟 [1;32m${(data[i].R).toFixed(1)}[0m [1;37m[[0m [1;32m${data[i].N}[0m [1;37m][0m\n[1;37m---[0m\n`
        if (i > 9 && i < 20) tR += `#️⃣ [1;36m${(data[i].R).toFixed(1)}[0m ${data[i].N}\n`
      }

      await client.channels.fetch(nconf.get('CHANNEL_LEADERBOARD')).then(async c => {
        await c.messages.fetch({ limit: 9, cache: false }).then(m => m.forEach(m => m.delete()))
        for (let i = 0; i < uris.length; i++) {
          await delay(6000)
          await fetch({ url: uris[i], headers: { Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.5', Authorization: nconf.get('USER1'), Connection: 'close', 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0' } }).then(res => {
            if (i === 0) serverEN = JSON.parse(res).total_results
            if (i === 1) serverFR = JSON.parse(res).total_results
            if (i === 2) serverOT = JSON.parse(res).total_results
            if (i === 3) serverT = JSON.parse(res).total_results
          }).catch(err => { throw err })
        }

        await c.send(`Out of **${data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** users: **${user0}** sent 0 messages, **${user1}** sent 1~10 messages, **${user10}** sent 11~99 messages, **${user100}** sent 100+ messages.\nOut of **${user1 + user10 + user100}** users who sent a message: **${userEN}** only in English channels, **${userFR}** only in French channels, **${userOT}** only in Other channels,\n**${userENFR}** in both English and French channels and **${userALL}** in English, French, as well as Other channels.\n\nMessages sent in the server:\nAll channels: **${serverT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** (**${totalT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users still in the server, **${(serverT - totalT).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users no longer in the server)\nEnglish channels: **${serverEN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${totalEN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users still in the server, **${(serverEN - totalEN).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users no longer in the server)\nFrench channels: **${serverFR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${totalFR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users still in the server, **${(serverFR - totalFR).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users no longer in the server)\nOther channels: **${serverOT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (${totalOT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users still in the server, **${(serverOT - totalOT).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from users no longer in the server)`)
        await c.send({ embeds: [new EmbedBuilder().setTitle('Oldest accounts in the server\nComptes les plus anciens du serveur').setDescription(`\`\`\`ansi\n${tC}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Overall rank (average from the 6 leaderboards below)\nClassement général (moyenne des 6 classements ci-dessous)').setDescription(`\`\`\`ansi\n${tR}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Total messages sent in Other channels\nTotal des messages envoyés sur les salons Autres').setDescription(`\`\`\`ansi\n${tOT}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Total messages sent in French channels\nTotal des messages envoyés sur les salons Françaises').setDescription(`\`\`\`ansi\n${tFR}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Total messages sent in English channels\nTotal des messages envoyés sur les salons Anglaises').setDescription(`\`\`\`ansi\n${tEN}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Most pinged users\nUtilisateurs les plus sollicités').setDescription(`\`\`\`ansi\n${tP}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Average messages per day since account creation\nMessages moyens par jour depuis la création du compte').setDescription(`\`\`\`ansi\n${tM}\`\`\``).setColor(random())] })
        await c.send({ embeds: [new EmbedBuilder().setTitle('Total messages sent in all channels\nTotal des messages envoyés sur tous les salons').setDescription(`\`\`\`ansi\n${tT}\`\`\``).setColor(random())] })
      })
    },
    start: true,
    timeZone: 'Europe/Paris'
  })
}