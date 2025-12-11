const { cmd } = require("../command");
const { sleep } = require('../lib/functions');

cmd({
  pattern: "ping",
  alias: ['🚀', "pong"],
  use: ".ping",
  desc: "Check bot's response time with loading bar + Meta Verified style.",
  category: 'main',
  react: '⚡',
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    const startTime = Date.now();

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
          displayName: '© 𝐃𝐀𝐑𝐊-𝐒𝐈𝐋𝐄𝐍𝐂𝐄-𝐌𝐃 ☑️',
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Alip;;;;
FN:Alip ☑️
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };

    const endTime = Date.now();

    const result = `> *_۞ 𝔻𝔸ℝ𝕂-𝕊𝐈𝕃𝐄ℕ𝐂𝐄-𝕄𝐃 𝕊ℙ𝔼𝔼𝔻: ${((endTime - startTime)/1000).toFixed(2)} 𝕄𝕤_*\n\n` +
                   `╭───〈👑 𝔸𝕃𝕀𝕍𝔼 👑〉───╮\n` +
                   `   ☑️ 𝕍𝔼ℝ𝕀𝔽𝔼𝔻 𝔹𝕐 𝕄𝔼𝕋𝔸\n` +
                   `   🔰 𝔹𝕆𝕋 𝕊𝕋𝔸𝕋𝕌𝕊: 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐞𝐝\n` +
                   `   ⚡ ℝ𝔼𝕊ℙ𝕆ℕ𝕊𝔼: 𝐒𝐭𝐚𝐛𝐥𝐞𝐝\n` +
                   `╰────────────────╯`;

    // ⚡ Inbox: show loading bar animation
    if (!isGroup) {
      let frames = [
        "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▱▱▱▱",
        "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▱▱▱",
        "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▱▱",
        "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▰▱",
        "⏳ 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝 ▰▰▰▰"
      ];

      let loadingMsg = await conn.sendMessage(from, { text: frames[0] }, { quoted: mek });

      for (let i = 1; i < frames.length; i++) {
        await sleep(150);
        try {
          await conn.sendMessage(from, { edit: loadingMsg.key, text: frames[i] });
        } catch {
          loadingMsg = await conn.sendMessage(from, { text: frames[i] });
        }
      }
    }

    // ⚡ Send final result (both inbox and group)
    await sleep(100);
    await conn.sendMessage(from, {
      text: result,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363405251820771@newsletter",
          newsletterName: "DARK-SILENCE-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: !isGroup ? lipx : mek });

  } catch (err) {
    console.error("Error in ping command:", err);
    reply("❌ An error occurred: " + err.message);
  }
});

// ping 2
const { cmd } = require("../command");
const { sleep } = require('../lib/functions');

cmd({
  pattern: "speed",
  react: '✨',
  alias: ["ping2"],
  desc: "Check bot's speed with fast counter + Meta Verified style.",
  category: 'main',
  use: ".ping2",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  try {
    const start = Date.now();

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

    let loadingMsg;

    // ⚡ Inbox: animate counter 1 → 100
    if (!isGroup) {
      loadingMsg = await conn.sendMessage(from, { text: "⚡ 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝: 1%" }, { quoted: mek });

      for (let i = 2; i <= 100; i++) {
        await sleep(15); // ultra fast
        try {
          await conn.sendMessage(from, {
            edit: loadingMsg.key,
            text: `⚡ 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝: ${i}%`
          });
        } catch {
          // fallback if edit fails
          loadingMsg = await conn.sendMessage(from, { text: `⚡ 𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐒𝐩𝐞𝐞𝐝: ${i}%` });
        }
      }
    }

    // ⚡ Group: skip animation (direct result)
    const end = Date.now();
    const speed = end - start;

    const result = `╭───〈🚀 𝕊ℙ𝔼𝔼𝔻 𝕋𝔼𝕊𝕋 🚀〉───╮\n` +
                   `  ☑️ 𝕍𝔼ℝ𝕀𝔽𝕀𝔼𝔻 𝔹𝕐 𝕄𝔼𝕋𝔸\n` +
                   `  ⚡ 𝕊𝕡𝕖𝕖𝕕: *${speed} ms*\n` +
                   `  🌐 𝕊𝕥𝕒𝕥𝕦𝕤: 𝔸𝕔𝕥𝕚𝕧𝕖\n` +
                   `╰──────────────────╯`;

    await sleep(50);

    await conn.sendMessage(from, {
      text: result,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363405251820771@newsletter",
          newsletterName: "DARK-SILENCE-MD",
          serverMessageId: 143
        }
      }
    }, { quoted: !isGroup ? lipx : mek });

  } catch (err) {
    console.error("Error in speed command:", err);
    reply("❌ An error occurred: " + err.message);
  }
});
