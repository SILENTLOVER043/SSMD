const { cmd } = require("../command");
const { fetchJson, sleep } = require("../lib/functions");

cmd({
    pattern: "pair",
    alias: ["register", "code"],
    react: "🔢",
    desc: "Pair WhatsApp number",
    category: "owner",
    use: ".pair +923096287432",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) {
            return conn.sendMessage(from, {
                text: "*Example:* `.pair +923096287432`",
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363405251820771@newsletter",
                        newsletterName: "DARK-SILENCE-MD",
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });
        }

        const apiURL = "https://pair-dark-silence-md.onrender.com/code?number=" + q;

        await conn.sendPresenceUpdate("composing", from);
        await sleep(600);

        let data;
        try {
            data = await fetchJson(apiURL);
        } catch (err) {
            return conn.sendMessage(from, {
                text: "❌ API Error - Server did not respond!",
                contextInfo: { mentionedJid: [m.sender], isForwarded: true }
            }, { quoted: mek });
        }

        if (!data.code) {
            return conn.sendMessage(from, {
                text: "❌ Invalid Response! No code returned from API.",
                contextInfo: { mentionedJid: [m.sender], isForwarded: true }
            }, { quoted: mek });
        }

        // First fancy message
        await conn.sendMessage(from, {
            text: `🌙 *DARK-SILENCE-MD PAIR CODE GENERATED*\n\nYOUR CODE IS SENDING BELOW ❤️👇`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363405251820771@newsletter",
                    newsletterName: "DARK-SILENCE-MD",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Second message: ONLY the code with contextInfo
        await conn.sendMessage(from, {
            text: data.code,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363405251820771@newsletter",
                    newsletterName: "DARK-SILENCE-MD",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.log("PAIR CMD ERROR:", err);
        reply("⚠️ Something went wrong!\n" + err);
    }
});
