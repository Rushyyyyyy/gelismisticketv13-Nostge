const Discord = require('discord.js');

module.exports = {
  name: 'setup',
  description: 'Ticket sistemi için gerekli ayarları yapar.',
  execute(interaction, args, ticketStates) {
    const embed = new Discord.MessageEmbed()
      .setColor('#3399cc')
      .setTitle('Ticket Oluşturma')
      .setDescription('Ticket oluşturmak için aşağıdaki butona tıklayın.')
      .setFooter('Nostge © Ticket Botu');

    const button = new Discord.MessageButton()
      .setCustomId('create_ticket')
      .setLabel('Ticket Oluştur')
      .setStyle('SUCCESS')
      .setEmoji('🎫');

    const row = new Discord.MessageActionRow().addComponents(button);

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
