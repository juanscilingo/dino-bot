var Service = require('node-windows').Service;
require('dotenv').config()

var svc = new Service({
  name:'DinoBot',
  description: 'DinoBot service for reading ARK RCON logs and posting them to discord',
  script: require('path').join(__dirname, '/../index.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: [
    { name: "LOG_PATH", value: process.env.LOG_PATH },
    { name: "DISCORD_WEBHOOK_URL", value: process.env.DISCORD_WEBHOOK_URL }
  ]
});

svc.on('install', () => {
  console.log('Server installed successfully');
  console.log('Starting service...');
  svc.start();
});

svc.on('alreadyinstalled', () => console.log('This service is already installed.'))
svc.on('start', () => console.log('Service successfully started'));

console.log('Installing service...')

svc.install();