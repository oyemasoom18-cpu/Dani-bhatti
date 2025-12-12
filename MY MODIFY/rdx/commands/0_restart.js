const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: 'restart',
    aliases: ['reboot', 'rs', 'rerun'],
    description: 'Restart the entire bot to apply new changes',
    usage: 'restart',
    category: 'Admin',
    adminOnly: true,
    prefix: true
  },
  
  async run({ api, event, send, config, client }) {
    const startTime = Date.now();
    
    await send.reply(`≿━━━━༺🔄༻━━━━≾
𝐑𝐄𝐒𝐓𝐀𝐑𝐓𝐈𝐍𝐆 𝐁𝐎𝐓
≿━━━━༺🔄༻━━━━≾

🤖 ${config.BOTNAME || 'Bot'} is restarting...
📦 Commands: ${client.commands?.size || 0}
📡 Events: ${client.events?.size || 0}

⏳ Please wait...
≿━━━━༺🔄༻━━━━≾`);
    
    setTimeout(async () => {
      try {
        let entryFile = path.join(process.cwd(), 'rdx.js');
        
        if (!fs.existsSync(entryFile)) {
          entryFile = path.join(process.cwd(), 'index.js');
        }
        
        if (!fs.existsSync(entryFile)) {
          return send.reply(`❌ Entry file not found! Cannot restart.`);
        }

        const isReplit = process.env.REPL_ID || process.env.REPLIT_DB_URL;
        
        if (isReplit) {
          const child = spawn('node', [entryFile], {
            detached: true,
            stdio: 'inherit',
            cwd: process.cwd(),
            env: { ...process.env, BOT_RESTARTED: 'true', RESTART_TIME: startTime.toString() }
          });
          
          child.unref();
          
          setTimeout(() => {
            process.exit(0);
          }, 1000);
        } else {
          const child = spawn(process.execPath, [entryFile], {
            detached: true,
            stdio: 'ignore',
            cwd: process.cwd(),
            env: { ...process.env, BOT_RESTARTED: 'true', RESTART_TIME: startTime.toString() }
          });
          
          child.unref();
          
          setTimeout(() => {
            process.exit(0);
          }, 1000);
        }
        
      } catch (error) {
        console.error('Restart error:', error);
        await send.reply(`❌ Restart failed: ${error.message}`);
      }
    }, 2000);
  }
};
