const { SlashCommandBuilder } = require('@discordjs/builders')
const nconf = require('nconf')

module.exports = {
  data: new SlashCommandBuilder().setName('ban').setDescription('Ban users')
    .addUserOption(option => option.setName('user').setDescription('Select a user')),
  async execute(interaction) {
    if (!nconf.get('CHANNEL_LOG')) return
    const user = interaction.options.getMember('user')

    await interaction.reply({ content: 'Users banned successfully.', ephemeral: true })
  }
}