// index.js - Código otimizado para Render
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express'); // IMPORTANTE: Para evitar dormir

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

// Servidor web para manter ativo
app.get('/', (req, res) => {
  res.send('🤖 Bot Discord Online no Render!');
});

// Rota secreta para ping automático
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Inicia servidor web na porta certa
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor web rodando na porta ${PORT}`);
});

// ========== SEU BOT AQUI ==========

client.on('ready', () => {
  console.log(`✅ ${client.user.tag} está online!`);
  console.log('📱 Hospedado no Render.com');
  console.log('🎮 Comandos: !ping, !info, !convite');
});

// Comandos do bot
client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  
  // COMANDO: !ping
  if (message.content === '!ping') {
    const latency = Date.now() - message.createdTimestamp;
    message.reply(`🏓 Pong! Latência: ${latency}ms`);
  }
  
  // COMANDO: !info
  if (message.content === '!info') {
    const embed = {
      color: 0x0099ff,
      title: 'Informações do Bot',
      fields: [
        { name: '📅 Criado em', value: client.user.createdAt.toDateString(), inline: true },
        { name: '🆔 ID', value: client.user.id, inline: true },
        { name: '⚙️ Hospedagem', value: 'Render.com (Gratuito)', inline: true },
        { name: '📊 Status', value: '✅ Online 24/7', inline: true },
        { name: '🔄 Uptime', value: `${process.uptime().toFixed(0)} segundos`, inline: true }
      ],
      timestamp: new Date(),
    };
    message.channel.send({ embeds: [embed] });
  }
  
  // COMANDO: !convite
  if (message.content === '!convite') {
    message.reply('🔗 Para me convidar: https://discord.com/oauth2/authorize?client_id=SEU_CLIENT_ID&scope=bot&permissions=8');
  }
  
  // COMANDO: !entrar (versão simplificada)
  if (message.content === '!entrar') {
    if (message.member.voice.channel) {
      message.member.voice.channel.join()
        .then(() => message.reply('✅ Entrei na call!'))
        .catch(err => message.reply(`❌ Erro: ${err.message}`));
    } else {
      message.reply('🎧 Entre em um canal de voz primeiro!');
    }
  }
});

// Sistema anti-sono (ping automático)
setInterval(() => {
  console.log('🔄 Keep-alive: Bot ativo');
}, 5 * 60 * 1000); // A cada 5 minutos

// ==================================

// IMPORTANTE: Use variável de ambiente
client.login(process.env.DISCORD_TOKEN);

console.log('🚀 Iniciando bot Discord...');
