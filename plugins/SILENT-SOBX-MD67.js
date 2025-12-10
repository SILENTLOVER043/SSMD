const {cmd , commands} = require('../command');
const { fetchJson } = require('../lib/functions');
const { File } = require("megajs");

cmd({
    pattern: "download",
    alias: ["downurl"],
    use: '.down  whatsapp bot',
    react: "📁",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
    if (!q) {
      return reply("❗ කරුණාකර download link එකක් ලබා දෙන්න."); // "Please provide a download link."
    }

    const link = q.trim();
    const urlPattern = /^(https?:\/\/[^\s]+)/;

    if (!urlPattern.test(link)) {
      return reply("❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න."); // "The provided URL is incorrect. Please check the link carefully."
    }
let info = `*© 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗦𝗜𝗟𝗘𝗡𝗧•𝗟𝗢𝗩𝗘𝗥💙💢 🌪️*`;

   await conn.sendMessage(from, {
                        document: { url: link},
                        mimetype: "video/mp4",
                        fileName: `mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info
                                            
                      }, { quoted: mek });

} catch (e) {
        console.log(e);
        reply(`${e}`);
        }
    });





cmd({
    pattern: "mega",
    desc: "commands panel",
    react: "🎀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    // Validate the provided URL
    if (!q || !isUrl(q) || !q.includes("mega.nz")) {
      return reply("Please provide a valid Mega.nz file URL.");
    }

    // Extract file URL and decryption key
    const [fileUrl, decryptionKey] = q.split('#');
    if (!decryptionKey) {
      return reply("Error: Decryption key is missing in the provided URL.");
    }

    // Start file download
    const megaFile = File.fromURL(fileUrl + '#' + decryptionKey);
    megaFile.on("progress", (downloaded, total) => {
      const progressPercentage = ((downloaded / total) * 100).toFixed(2);
      reply(`Downloading: ${progressPercentage}% (${(downloaded / 1024 / 1024).toFixed(2)} MB of ${(total / 1024 / 1024).toFixed(2)} MB)`);
    });

    // Download file and send it
    const fileBuffer = await megaFile.downloadBuffer();
    const documentMessage = {
      document: fileBuffer,
      mimetype: "application/octet-stream",
      fileName: "mega_downloaded_file"
    };

    const options = { quoted: message };
    await conn.sendMessage(from, documentMessage, options);
    reply("*© 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗦𝗜𝗟𝗘𝗡𝗧𝗟𝗢𝗩𝗘𝗥🌪️*");
  } catch (error) {
    console.error(error);
    reply("Error: " + error.message);
  }
});