const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function cancelTicketTimeout(channel) {
  // Fonksiyonun içeriği buraya gelecek
}

module.exports = {
  name: 'reopen',
  description: 'Ticket tekrar açma komutu',
  execute(message, args, ticketStates) {
    const channel = message.channel;
    const ticketState = ticketStates.get(channel.id);

    if (ticketState && !ticketState.open) {
      ticketState.open = true;

      channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: true })
      const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription('Ticketınız tekrar açıldı. Sorununuzu yazabilirsiniz.')
        .setFooter('Nostge © Ticket Botu');
      const closeButton = new MessageButton()
        .setCustomId('close_ticket')
        .setLabel('Ticketı Kapat')
        .setStyle('DANGER')
        .setEmoji('🔒');

      const row = new MessageActionRow().addComponents(closeButton);

      channel.send({ embeds: [embed], components: [row] })
        .then(() => {
          cancelTicketTimeout(channel);
        })
        .catch((error) => {
          console.error('Mesaj gönderilirken bir hata oluştu:', error);
        });
    }
  },
};
