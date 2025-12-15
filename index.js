const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

// Quando bot ficar online
client.on('ready', () => {
  console.log(`✅ ${client.user.tag} está online!`);
  console.log('🚀 Hospedado no Railway + GitHub!');
});

// Comandos simples
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content === '!ping') {
    message.reply('Pong! 🏓 (GitHub + Railway)');
  }
  
  if (message.content === '!ola') {
    message.reply(`Olá ${message.author.username}! 👋`);
  }
  
  if (message.content === '!entrar') {
    if (message.member.voice.channel) {
      await message.member.voice.channel.join();
      message.reply('🎤 Entrei na call!');
    } else {
      message.reply('❌ Entre em um canal de voz primeiro!');
    }
  }
});

// Usa variável de ambiente do Railway
client.login(process.env.DISCORD_TOKEN);
