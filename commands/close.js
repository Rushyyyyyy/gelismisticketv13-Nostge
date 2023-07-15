const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const reopenTimeout = 60000; // 60 saniye

module.exports = {
  name: 'close',
  description: 'Ticket kapatma komutu',
  execute(message, args, ticketStates) {
    const channel = message.channel || message.channel();
    const ticketState = ticketStates.get(channel.id);

    if (ticketState && ticketState.open) {
      ticketState.open = false;

      channel.permissionOverwrites.edit(channel.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false })
        .then(() => {
          const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription('Ticket Kapatıldı. Bu kanal 1 dakika içinde silinecektir.')
            .setFooter('Nostge © Ticket Botu');
          const reopenButton = new MessageButton()
            .setCustomId('reopen_ticket')
            .setLabel('Ticketı Tekrar Aç')
            .setStyle('SUCCESS')
            .setEmoji('🔓');

          const row = new MessageActionRow().addComponents(reopenButton);

          channel.send({ embeds: [embed], components: [row] })
            .then(() => {
              const timeout = setTimeout(() => {
                channel.delete()
                  .then(() => {
                    ticketStates.delete(channel.id);
                  })
                  .catch((error) => {
                    console.error('Kanal silinirken bir hata oluştu:', error);
                  });
              }, reopenTimeout);

              ticketState.timeout = timeout;
            })
            .catch((error) => {
              console.error('Mesaj gönderilirken bir hata oluştu:', error);
            });
        })
        .catch((error) => {
          console.error('Kanal kilitlenirken bir hata oluştu:', error);
        });
    }
  },
};
