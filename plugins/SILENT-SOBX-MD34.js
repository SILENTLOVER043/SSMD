const {
  cmd,
  commands
} = require("../command");
const {
  sleep
} = require('../lib/functions');

cmd({
  pattern: "ping",
  alias: ['🚀', "pong"],
  use: ".ping",
  desc: "Check bot's response time with loading bar + Meta Verified style.",
  category: 'main',
  react: '⚡',
  filename: __filename
}, async (conn, mek, m, { from, quoted, sender, reply }) => {
  try {
    const startTime = new Date().getTime();

    // 🔹 Meta Verified Style (Fake vCard Contact)
    const lipx = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        id: 'FAKE_META_ID_001',
        participant: '13135550002@s.whatsapp.net'
      },
      message: {
        contactMessage: {
          displayName: '© 𝐃𝐀𝐑𝐊-𝐒𝐈𝐋𝐄𝐍𝐂𝐄-𝐌𝐃 ☑️', // Blue Tick Added
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Alip;;;;
FN:Alip ☑️
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };

    // Loading progress bar animation
    let frames = [
      "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▱▱▱▱",
      "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▱▱▱",
      "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▱▱",
      "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▰▱",
      "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▰▰"
    ];

    let loadingMsg = await conn.sendMessage(from, { text: frames[0] }, { quoted: mek });

    for (let i = 1; i < frames.length; i++) {
      await sleep(400); // ⚡ fast speed
      await conn.sendMessage(from, { edit: loadingMsg.key, text: frames[i] }, { quoted: mek });
    }

    const endTime = new Date().getTime();
    const speed = (endTime - startTime) / 1000;

    const result = `> *_۞ 𝔻𝔸ℝ𝕂-𝕊𝕀𝕃𝔼ℕℂ𝔼-𝕄𝔻 𝕊ℙ𝔼𝔼𝔻: ${speed.toFixed(2)} 𝕄𝕤_*\n\n` +
                   `╭───〈👑 𝔸𝕃𝕀𝕍𝔼 👑〉───╮\n` +
                   `   ☑️ 𝕍𝔼ℝ𝕀𝔽𝔼𝔻 𝔹𝕐 𝕄𝔼𝕋𝔸\n` +
                   `   🔰 𝔹𝕆𝕋 𝕊𝕋𝔸𝕋𝕌𝕊: 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐞𝐝\n` +
                   `   ⚡ ℝ𝔼𝕊ℙ𝕆ℕ𝕊𝔼: 𝐒𝐭𝐚𝐛𝐥𝐞𝐝\n` +
                   `╰────────────────╯`;

    await sleep(500);
    await conn.sendMessage(from, {
      text: result,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363189714152560@newsletter",
          newsletterName: "DARK-SILENCE-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: lipx }); // 👈 Meta Verified + Blue Tick Style

  } catch (err) {
    console.error("Error in ping command:", err);
    reply("❌ An error occurred: " + err.message);
  }
});

// ping 2


cmd({
  pattern: "speed",
  react: '✨',
  alias: ["ping2"],
  desc: "Check bot's speed with fast counter + Meta Verified style.",
  category: 'main',
  use: ".ping2",
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  sender,
  reply
}) => {
  try {
    const start = new Date().getTime();

    // 🔹 Meta Verified Style (Fake vCard Contact)
    const lipx = {
      key: {
        remoteJid: "status@broadcast",
        fromMe: false,
        id: 'FAKE_META_ID_002',
        participant: '13135550002@s.whatsapp.net'
      },
      message: {
        contactMessage: {
          displayName: '© 𝐃𝐀𝐑𝐊-𝐒𝐈𝐋𝐄𝐍𝐂𝐄-𝐌𝐃 ☑️',
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Dark Silence;;;;
FN:Dark Silence ☑️
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };

    // Start with counter
    let loadingMsg = await conn.sendMessage(from, { text: "⚡ 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝: 1%" }, { quoted: mek });

    // Counter 1 → 100 (very fast edit)
    for (let i = 2; i <= 100; i++) {
      await sleep(25); // super fast speed
      await conn.sendMessage(from, {
        edit: loadingMsg.key,
        text: `⚡ 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝: ${i}%`
      }, { quoted: mek });
    }

    // Calculate speed
    const end = new Date().getTime();
    const speed = (end - start);

    // Final Result
    const result = `╭───〈🚀 𝕊ℙ𝔼𝔼𝔻 𝕋𝔼𝕊𝕋 🚀〉───╮\n` +
                   `  ☑️ 𝕍𝔼ℝ𝕀𝔽𝕀𝔼𝔻 𝔹𝕐 𝕄𝔼𝕋𝔸\n` +
                   `  ⚡ 𝕊𝕡𝕖𝕖𝕕: *${speed} ms*\n` +
                   `  🌐 𝕊𝕥𝕒𝕥𝕦𝕤: 𝔸𝕔𝕥𝕚𝕧𝕖\n` +
                   `╰──────────────────╯`;

    await sleep(300);

    // 👇 ContextInfo + Meta Verified Blue Tick Style
    await conn.sendMessage(from, {
      text: result,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363189714152560@newsletter",
          newsletterName: "DARK-SILENCE-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: lipx });

  } catch (err) {
    console.error("Error in ping command:", err);
    reply("❌ An error occurred: " + err.message);
  }
});