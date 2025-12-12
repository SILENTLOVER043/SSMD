// ================= CLEAN FULL WORKING VERSION ==================

const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const axios = require('axios');
const os = require("os");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { writeFileSync } = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../silentlover/SILENT-SOBX-MD');
const { exec } = require('child_process');

// ================== GLOBALS ==================
let antilinkAction = "off";
let warnCount = {};
let antibotAction = "off";
let warnings = {};

// ================== SAVE CONFIG ==================
function saveConfig() {
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
}

// ================== SET PREFIX ==================
cmd({
  pattern: "setprefix",
  alias: ["prefix"],
  desc: "Change bot prefix.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { args, isOwner, reply }) => {

  if (!isOwner)
    return reply("📛 Only the owner can use this command!");

  // Show current prefix if no argument
  if (!args[0])
    return reply(`📌 Current Prefix: *${config.PREFIX}*\nUsage: .setprefix <new prefix>`);

  const newPrefix = args[0];

  // Apply change
  config.PREFIX = newPrefix;
  saveConfig(); // VERY IMPORTANT

  await reply(`*_PREFIX UPDATED TO:* ${newPrefix} ✅_*`);

  // Reply with CURRENT prefix in update message
  await reply(
    `*DATABASE UPDATE — YOUR CURRENT PREFIX IS:* ${config.PREFIX} ✅`
  );

});

// ================== BOT MODE ==================
cmd({
  pattern: "mode",
  desc: "Set bot mode to private or public.",
  category: "settings",
  filename: __filename
}, async (conn, mek, m, { args, isOwner, reply }) => {

  if (!isOwner)
    return reply("📛 Only the owner can use this command!");

  // Show current mode if no argument
  if (!args[0])
    return reply(`📌 Current Mode: *${config.MODE.toUpperCase()}*\nUsage: .mode private OR .mode public`);

  const mode = args[0].toLowerCase();
  if (!["private", "public"].includes(mode))
    return reply("❌ Invalid mode. Use: private/public");

  // Apply change
  config.MODE = mode;
  saveConfig();

  await reply(`*_BOT MODE SET TO ${mode.toUpperCase()} ✅_*`);

  // Reply with CURRENT MODE in DATABASE UPDATE line
  await reply(
    `*DATABASE UPDATE — YOUR CURRENT MODE IS:* ${config.MODE.toUpperCase()} ✅`
  );

  // Sleep optional
  // await sleep(1500);
});

// ================== TOGGLE SETTINGS ==================
const toggleSettings = [
  { pattern: "fake_typing", key: "FAKE_TYPING" },
  { pattern: "always_online", key: "ALWAYS_ONLINE" },
  { pattern: "fake_reacording", key: "FAKE_REACORDING" },
  { pattern: "auto_read_status", key: "AUTO_READ_STATUS" },
  { pattern: "status_react", key: "STATUS_REACT" },
  { pattern: "read_message", key: "READ_MESSAGE" },
  { pattern: "anti_bad", key: "ANTI_BAD" },
  { pattern: "auto_sticker", key: "AUTO_STICKER" },
  { pattern: "auto_reply", key: "AUTO_REPLY" },
  { pattern: "auto_voice", key: "AUTO_VOICE" },
  { pattern: "auto_react", key: "AUTO_REACT" },
  { pattern: "heart_react", key: "HEART_REACT" },
  { pattern: "anti_call", key: "ANTI_CALL" },
  { pattern: "auto_block", key: "AUTO_BLOCK" },
  { pattern: "bad_number_blocker", key: "BAD_NUMBER_BLOCKER" },
  { pattern: "auto_reply_status", key: "AUTO_REPLY_STATUS" },
  { pattern: "anti_link", key: "ANTI_LINK" }
];

toggleSettings.forEach(item => {
  cmd({
    pattern: item.pattern,
    desc: `Toggle ${item.key}`,
    category: "settings",
    filename: __filename
  }, async (conn, mek, m, { args, isOwner, reply }) => {

    if (!isOwner) return reply("📛 Only the owner can use this command!");

    const status = args[0]?.toLowerCase();
    if (!status || !["on", "off"].includes(status))
      return reply(`Example: .${item.pattern} on`);

    config[item.key] = status === "on" ? "true" : "false";
    saveConfig();

    await reply(`*${item.key} IS NOW ${status.toUpperCase()} ✅*`);
  });
});

// ================== ANTILINK ==================
cmd({
  pattern: "antilink",
  desc: "Set Antilink action",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {

  if (!q) return reply(`*Current Antilink Action:* ${antilinkAction.toUpperCase()}\nUse: antilink warn/delete/kick/off`);

  const action = q.toLowerCase();
  if (!["warn", "delete", "kick", "off"].includes(action))
    return reply("❌ Invalid option!");

  antilinkAction = action;
  await reply(`*Antilink action set to:* ${action.toUpperCase()}`);
});

cmd({ on: "body" }, async (conn, mek, m, { from, body, isGroup, sender, isBotAdmins, isAdmins, reply }) => {

  if (!isGroup || antilinkAction === "off") return;
  if (!isBotAdmins || isAdmins) return;

  if (isUrl(body)) {
    await conn.sendMessage(from, { delete: mek.key });

    switch (antilinkAction) {

      case "warn":
        warnCount[sender] = (warnCount[sender] || 0) + 1;
        if (warnCount[sender] >= 3) {
          delete warnCount[sender];
          await conn.groupParticipantsUpdate(from, [sender], "remove");
        } else {
          return reply(`⚠️ @${sender.split("@")[0]}, warning ${warnCount[sender]}/3!`, { mentions: [sender] });
        }
        break;

      case "kick":
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        break;
    }
  }
});

// ================== ANTIBOT ==================
cmd({
  pattern: "antibot",
  desc: "Set antibot action",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {

  if (!q) return reply(`*Current Antibot Action:* ${antibotAction.toUpperCase()}\nUse: antibot off/warn/delete/kick`);

  const action = q.toLowerCase();
  if (!["off", "warn", "delete", "kick"].includes(action))
    return reply("Invalid action");

  antibotAction = action;
  await reply(`*Antibot action set to:* ${action.toUpperCase()}`);
});

cmd({ on: "body" }, async (conn, mek, m, { from, isGroup, sender, isBotAdmins, isAdmins, reply }) => {

  if (!isGroup || antibotAction === "off") return;
  if (!isBotAdmins || isAdmins) return;

  const messageId = mek.key?.id;
  if (!messageId || !messageId.startsWith("3EB")) return;

  await conn.sendMessage(from, { delete: mek.key });

  if (antibotAction === "kick") {
    await conn.groupParticipantsUpdate(from, [sender], "remove");
  }

  if (antibotAction === "warn") {
    warnings[sender] = (warnings[sender] || 0) + 1;

    if (warnings[sender] >= 3) {
      delete warnings[sender];
      await conn.groupParticipantsUpdate(from, [sender], "remove");
    } else {
      return reply(`⚠️ @${sender.split("@")[0]}, warning ${warnings[sender]}/3! Bots not allowed!`, { mentions: [sender] });
    }
  }
});

// ================= END CLEAN CODE =================
