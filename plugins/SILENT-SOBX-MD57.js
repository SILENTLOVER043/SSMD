const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');

// ✔ Allow only these 3 owner numbers
const allowedOwners = [
    "923096287432@s.whatsapp.net",
    "923154647639@s.whatsapp.net",
    "923306288432@s.whatsapp.net"
];

cmd({
    pattern: "file",
    alias: ["source", "js"],
    desc: "Fetch the full source code of a command",
    category: "owner",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {

        // 🚫 Only allowed numbers can use this
        if (!allowedOwners.includes(m.sender)) {
            return reply("❌ This command is locked.\nOnly *Silent Lover's Special Owners* can use it.");
        }

        if (!args[0]) return reply("❌ Please provide a command name. Example: `.file alive`");

        const commandName = args[0].toLowerCase();
        const commandData = commands.find(
            cmd => cmd.pattern === commandName || (cmd.alias && cmd.alias.includes(commandName))
        );

        if (!commandData) return reply("❌ Command not found!");

        const commandPath = commandData.filename;
        const fullCode = fs.readFileSync(commandPath, 'utf-8');

        let truncatedCode = fullCode;
        if (truncatedCode.length > 4000) {
            truncatedCode = fullCode.substring(0, 4000) + "\n\n// Code too long, full file below 📂";
        }

        const formattedCode = `⬤───〔 *📜 DARK-SILENCE-MD COMMAND SOURCE* 〕───⬤
\`\`\`js
${truncatedCode}
\`\`\`
╰──────────⊷  
⚡ Full file sent below 📂  
POWERD BY SILENTLOVER432 🌕`;

        await conn.sendMessage(from, {
            image: { url: `https://telegra.ph/file/2a06381b260c3f096a612.jpg` },
            caption: formattedCode,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363405251820771@newsletter',
                    newsletterName: 'DARK-SILENCE-MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        const fileName = `${commandName}.js`;
        const tempPath = path.join(__dirname, fileName);
        fs.writeFileSync(tempPath, fullCode);

        await conn.sendMessage(from, {
            document: fs.readFileSync(tempPath),
            mimetype: 'text/javascript',
            fileName: fileName
        }, { quoted: mek });

        fs.unlinkSync(tempPath);

    } catch (e) {
        console.error("Error in .file command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});