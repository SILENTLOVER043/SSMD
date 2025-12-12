const { cmd } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { getBuffer } = require('../lib/functions');
const fs = require('fs');
const os = require('os');
const path = require('path');

cmd({
  pattern: "find",
  desc: "Search song/video/short and send audio reliably",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {

  if (!args[0]) return reply("❌ Provide song/video name or link\nUsage: .find <name or link>");
  const query = args.join(" ");

  try {
    let result;

    if (query.match(/(youtu\.be|youtube\.com)/)) {
      const id = query.includes("v=") ? query.split("v=")[1] : query.split("/").pop();
      const res = await yts({ videoId: id });
      result = res;
    } else {
      const searchResult = await yts(query);
      result = searchResult.videos[0];
    }

    if (!result) return reply("❌ No results found");

    const type = result.type === 'video' && result.videoId.length <= 11 ? 'Song/Video' : result.type;

    let msg = `🎵 *FOUND:* ${result.title}\n`;
    msg += `📌 *Author:* ${result.author.name}\n`;
    msg += `⌚ *Duration:* ${result.timestamp}\n`;
    msg += `🎬 *Type:* ${type}\n`;
    msg += `🔗 *Link:* ${result.url}`;

    const thumb = await getBuffer(result.thumbnail);
    await conn.sendMessage(m.chat, { image: thumb, caption: msg });

    // ================= DOWNLOAD AUDIO TO TEMP FILE =================
    const tempFile = path.join(os.tmpdir(), `${Date.now()}.mp3`);
    const audioStream = ytdl(result.url, { filter: 'audioonly', quality: 'highestaudio' });
    const writeStream = fs.createWriteStream(tempFile);

    audioStream.pipe(writeStream);

    writeStream.on('finish', async () => {
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(tempFile),
        mimetype: 'audio/mpeg',
        ptt: false
      });
      fs.unlinkSync(tempFile); // delete temp file
    });

  } catch (e) {
    console.log(e);
    reply("❌ Error while searching/downloading audio. Try again later.");
  }
});
