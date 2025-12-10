const{ cmd, commands } = require('../command');
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
} = require('@whiskeysockets/baileys');
const os = require("os");

cmd({
  pattern: "menu4",
  react: "🤭",
  alias: ["commands"],
  desc: "Get bot's command list.",
  filename: __filename
},
async(conn, mek, m, { from, prefix, quoted, q, reply }) => {
  try {
    let hostname;
    if (os.hostname().length == 12) hostname = 'replit';
    else if (os.hostname().length == 36) hostname = 'heroku';
    else if (os.hostname().length == 8) hostname = 'koyeb';
    else hostname = os.hostname();

    const monspace = '```';
    const monspacenew = '`';
    const cap = `POWERED BY SILENTLOVER432`;
    var vajiralod = [
      "LOADING [⬛⬛⬜⬜⬜⬜]",
      "LOADING [⬛⬛⬛⬜⬜⬜]",
      "LOADING [⬛⬛⬛⬛⬜⬜]",
      "LOADING [⬛⬛⬛⬛⬛⬜]",
      "LOADING [⬛⬛⬛⬛⬛⬛]",
      "`COMPLETED ✅`"
    ];

    let { key } = await conn.sendMessage(from, { text: '' });
    for (let i = 0; i < vajiralod.length; i++) {
      await conn.sendMessage(from, { text: vajiralod[i], edit: key });
    }

    const category = q.trim().toUpperCase();
    let wm = '> POWERD BY SILENTLOVER432';

    function buildMenu(cat, title) {
      let menu = `*⌬≡≡≡≡≡≡≡${category} ${title.toUpperCase()} CMD ≡≡≡≡≡≡⌬*\n\n`;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === cat && !commands[i].dontAddCommandList) {
          menu += `• *${commands[i].pattern}*\n`;
        }
      }
      menu += `\n⭓ 𝔸𝕃𝕃 ℂ𝕄𝔻 𝕃𝕀𝕊𝕋 ${category}: ${commands.filter(cmd => cmd.category === cat).length}\n\n${wm}`;
      return menu;
    }

    const menus = [
      buildMenu('group', 'group'),
      buildMenu('download', 'download'),
      buildMenu('convert', 'convert'),
      buildMenu('main', 'main'),
      buildMenu('owner', 'owner'),
      buildMenu('fun', 'fun'),
      buildMenu('search', 'search'),
      buildMenu('other', 'other'),
      buildMenu('utility', 'utility'),
    ];

    const cards = [];
    for (const menu of menus) {
      const preparedMedia = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/2a06381b260c3f096a612.jpg' } }, { upload: conn.waUploadToServer });
      const card = {
        header: proto.Message.InteractiveMessage.Header.create({
          ...preparedMedia,
          title: menu,
          gifPlayback: true,
          subtitle: "𝐃𝐀𝐑𝐊-𝐒𝐈𝐋𝐄𝐍𝐂𝐄-𝐌𝐃 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓",
          hasMediaAttachment: false
        }),
        body: { text: '' },
        nativeFlowMessage: {}
      };
      cards.push(card);
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: '' },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363189714152560@newsletter',
                newsletterName: `𝐃𝐀𝐑𝐊-𝐒𝐈𝐋𝐄𝐍𝐂𝐄-𝐌𝐃`,
                serverMessageId: 143
              }
            }
          }
        }
      }
    }, { quoted: m });

    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.log(e);
    reply(`❌ Error occurred in cmdmenu.\n\n${e.message}`);
  }
});