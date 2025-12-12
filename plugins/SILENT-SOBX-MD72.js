const { cmd } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { getBuffer } = require('../lib/functions');

cmd({
  pattern: "find",
  desc: "Search song/video/short by name or link and send audio",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {

  if (!args[0]) return reply("❌ Provide song/video name or link\nUsage: .find <name or link>");

  const query = args.join(" ");

  try {
    let result;

    // Check if it's a YouTube link
    if (query.match(/(youtu\.be|youtube\.com)/)) {
      const id = query.includes("v=") ? query.split("v=")[1] : query.split("/").pop();
      const res = await yts({ videoId: id });
      result = res;
    } else {
      // Search by name
      const searchResult = await yts(query);
      result = searchResult.videos[0]; // first video
    }

    if (!result) return reply("❌ No results found");

    // Determine type: video/short
    const type = result.type === 'video' && result.videoId.length <= 11 ? 'Song/Video' : result.type;

    let msg = `🎵 *FOUND:* ${result.title}\n`;
    msg += `📌 *Author:* ${result.author.name}\n`;
    msg += `⌚ *Duration:* ${result.timestamp}\n`;
    msg += `🎬 *Type:* ${type}\n`;
    msg += `🔗 *Link:* ${result.url}`;

    // Send thumbnail first
    const thumb = await getBuffer(result.thumbnail);
    await conn.sendMessage(m.chat, { image: thumb, caption: msg });

    // Download audio using ytdl-core
    const audioStream = ytdl(result.url, { filter: 'audioonly', quality: 'highestaudio' });

    await conn.sendMessage(m.chat, { audio: audioStream, mimetype: 'audio/mpeg', ptt: false });

  } catch (e) {
    console.log(e);
    reply("❌ Error while searching/downloading audio. Try again later.");
  }
});
