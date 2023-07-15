const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});


const prefix = '+';
const buttonLabel = 'Ticket Oluştur';
const categoryId = '1129731699618627594';
const reopenTimeout = 1 * 60 * 1000;

async function createTicket(member, category, ticketStates) {
  // createTicket fonksiyonunun içeriği buraya gelecek
}

function cancelTicketTimeout(channel, ticketStates) {
  // cancelTicketTimeout fonksiyonunun içeriği buraya gelecek
}

function deleteTicket(channel, ticketStates) {
  // deleteTicket fonksiyonunun içeriği buraya gelecek
}

const ticketStates = new Map();

client.on('ready', () => {
  console.log(`Bot giriş yaptı: ${client.user.tag}`);
  client.user.setActivity('Code', { type: 'COMPETING' });
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'setup') {
    const setupCommand = require('./commands/setup.js');
    setupCommand.execute(message, args, ticketStates);
  }

  if (command === 'ticket') {
    const ticketCommand = require('./commands/ticket.js');
    ticketCommand.execute(message, args, ticketStates, categoryId);
  }

  if (command === 'close') {
    const closeCommand = require('./commands/close.js');
    closeCommand.execute(message, args, ticketStates);
  }

  if (command === 'reopen') {
    const reopenCommand = require('./commands/reopen.js');
    reopenCommand.execute(message, args, ticketStates);
  }
  if (command === 'open') {
    const reopenCommand = require('./commands/open.js');
    reopenCommand.execute(message, args, ticketStates);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'create_ticket') {
    const ticketCommand = require('./commands/ticket.js');
    ticketCommand.execute(interaction, [], ticketStates, categoryId);
  }

  if (interaction.customId === 'close_ticket') {
    const closeCommand = require('./commands/close.js');
    closeCommand.execute(interaction, [], ticketStates);
  }

  if (interaction.customId === 'reopen_ticket') {
    const reopenCommand = require('./commands/reopen.js');
    reopenCommand.execute(interaction, [], ticketStates);
  }
  if (interaction.customId === 'open_ticket') {
    const reopenCommand = require('./commands/open.js');
    reopenCommand.execute(interaction, [], ticketStates);
  }
});

client.login("MTA5OTcxMDkxMTEyMTQ2MTI4OA.GQ4Ezb.eA-F5upJFnOqVr81-1EmrA2cexKABj4iAzW9N4");
