const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: 'owner',
    aliases: ['dev', 'creator', 'developer'],
    description: 'Show bot owner information',
    credits: 'SARDAR RDX',
    usage: 'owner',
    category: 'Info',
    prefix: false
  },

  async run({ api, event, send, config }) {
    const { threadID, messageID } = event;

    const ownerPics = [
      'https://i.ibb.co/0R46HGjm/80fa2f64c015.jpg',
      '',
      '',
      ''
    ];

    const randomPic = ownerPics[Math.floor(Math.random() * ownerPics.length)];

    const ownerInfo = `
╔═══════════════════════════
║        🥴 L͢͡ɛ͡جɜ͜͡ƞd Dʌ͒͢نɪ̽ 🥴           
╠═══════════════════════════
║                                    
║𝐍𝐀𝐌𝐄: DANIYAL BHATTI       
║𝐀𝐆𝐄  : 19+                     
║𝐂𝐋𝐀𝐒𝐒: 𝐈𝐍𝐓𝐄𝐑 2𝐍𝐃 𝐘𝐄𝐀𝐑          
║𝐇𝐎𝐌𝐄𝐓𝐎𝐖𝐍:PAKISTAN             
║𝐋𝐈𝐕𝐈𝐍𝐆:KARACHI
║𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏:SINGLE 
║𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘:9 AUGUST                 
║𝐇𝐄𝐈𝐆𝐇𝐓:5 𝐅𝐓 8 𝐈𝐍𝐂𝐇 
║𝐖𝐄𝐈𝐆𝐇𝐓:50𝐊𝐆
║𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 :𝐈𝐒𝐋𝐀𝐌
╠═══════════════════════════
║  📱 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐈𝐧𝐟𝐨:          
║                           
║  🌐 FACEBOOK:              
║   https://www.facebook.com/share/1FoTXGDgUo/
║                           
║  📲 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩:              
║  wa.me/+923273760662 
║                           
╠═══════════════════════════
║  🤖 𝐁𝐨𝐭 𝐃𝐞𝐭𝐚𝐢𝐥𝐬:           
║                           
║  📛 Name: ${config.BOTNAME || 'Dʌ͒͢نɪ̽'}
║  ⚡ Prefix: ${config.PREFIX || '.'}
║  💻 Version: 0.5       
║  🛠️ Framework: RDX-FCA   
║                           
╠═══════════════════════════
║  💝 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙛𝙤𝙧 𝙪𝙨𝙞𝙣𝙜!  
╚═══════════════════════════
    `.trim();

    try {
      const cacheDir = path.join(__dirname, 'cache');
      fs.ensureDirSync(cacheDir);
      const imgPath = path.join(cacheDir, `owner_${Date.now()}.jpg`);
      
      const response = await axios.get(randomPic, { responseType: 'arraybuffer' });
      fs.writeFileSync(imgPath, Buffer.from(response.data));
      
      api.sendMessage(
        {
          body: ownerInfo,
          attachment: fs.createReadStream(imgPath)
        },
        threadID,
        () => {
          try { fs.unlinkSync(imgPath); } catch {}
        },
        messageID
      );
    } catch (error) {
      return send.reply(ownerInfo);
    }
  }
};
