const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'ticket',
  description: 'Ticket oluşturma komutu',
  execute(interaction, args, ticketStates, categoryId) {
    if (!interaction || !interaction.user || !interaction.guild) return;

    const userId = interaction.user.id;
    const ticketName = `ticket-${userId}`;

    const guild = interaction.guild;
    const category = guild.channels.cache.get(categoryId);
    if (!category) {
      interaction.reply('Geçerli bir kategori bulunamadı. Lütfen geçerli bir kategori tanımladığınızdan emin olun.');
      return;
    }

    const existingTickets = category.children.filter((channel) => channel.name === ticketName);
if (existingTickets.size > 0) {
  const existingTicket = existingTickets.first();
  interaction.reply(`Zaten bir açık ticketın var: <#${existingTicket.id}>`).catch(console.error);

  setTimeout(() => {
    interaction.deleteReply().catch(console.error);
  }, 5000);
  return;
}


    guild.channels
      .create(ticketName, {
        type: 'text',
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL'],
          },
        ],
        parent: category.id,
      })
      .then((channel) => {
        const embed = new MessageEmbed()
          .setColor('#3399cc')
          .setTitle('Nostge Ticket Sistemi')
          .setDescription(`Merhaba, ${interaction.user} bakıyoruz ticket açmışsın ne konuda yardım edebiliriz lütfen bize ister uzun istersende kısa bir şekilde anlat`)
          .setFooter('Nostge © Ticket Botu');

        const closeButton = new MessageButton()
          .setCustomId('close_ticket')
          .setLabel('Ticketı Kapat')
          .setStyle('DANGER')
          .setEmoji('🔒');

        const row = new MessageActionRow().addComponents(closeButton);

        channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] });

        ticketStates.set(channel.id, {
          member: interaction.user.id,
          open: true,
          timeout: null,
        });
      })
      .catch((error) => {
        interaction.reply('Ticket oluşturulurken bir hata oluştu.');
        console.error('Ticket oluşturulurken bir hata oluştu:', error);
      });
  },
};
