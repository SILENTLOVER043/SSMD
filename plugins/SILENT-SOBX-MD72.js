const { cmd } = require('../command');
const yts = require('yt-search');
const { getBuffer } = require('../lib/functions');

cmd({
  pattern: "find",
  desc: "Search song/video/short by name or link with preview",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {

  if (!args[0]) return reply("❌ Please provide song/video name or link\nUsage: .find <name or link>");

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
      result = searchResult.videos[0]; // take first video
    }

    if (!result) return reply("❌ No results found");

    // Determine type: video/short
    const type = result.type === 'video' && result.videoId.length <= 11 ? 'Song/Video' : result.type;

    let msg = `🎵 *FOUND:* ${result.title}\n`;
    msg += `📌 *Author:* ${result.author.name}\n`;
    msg += `⌚ *Duration:* ${result.timestamp}\n`;
    msg += `🎬 *Type:* ${type}\n`;
    msg += `🔗 *Link:* ${result.url}`;
    msg += `⭐ *POWERD BY SILENTLOVER432 ❤️*`;

    // Get thumbnail buffer
    const thumb = await getBuffer(result.thumbnail);

    await conn.sendMessage(m.chat, { image: thumb, caption: msg });

  } catch (e) {
    console.log(e);
    reply("❌ Error while searching. Try again later.");
  }
});
