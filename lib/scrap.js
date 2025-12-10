const axios = require("axios");
const cheerio = require("cheerio");
const yts = require('yt-search');

async function ytmp3(link, format = "mp3") {
  try {
    // 1. Access yt.savetube.me to get initial page (optional if you want to parse hidden values)
    const pageRes = await axios.get("https://yt.savetube.me", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36",
      },
    });

    // Load the HTML if you want to scrape tokens/keys (in case they use CSRF or hidden params)
    const $ = cheerio.load(pageRes.data);

    // 2. Create a conversion task
    const createUrl = `https://loader.to/ajax/download.php?button=1&format=${format}&url=${encodeURIComponent(
      link
    )}`;
    const createRes = await axios.get(createUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36",
        Referer: "https://yt.savetube.me/",
      },
    });

    if (!createRes.data.success || !createRes.data.id) {
      throw new Error("Failed to create task. Invalid link or format.");
    }

    const taskId = createRes.data.id;

    // 3. Poll progress until the download link is ready
    let downloadUrl = null;
    let title = "";
    let thumbnail = "";

    while (!downloadUrl) {
      await new Promise((r) => setTimeout(r, 3000)); // wait 3s between polls

      const statusUrl = `https://loader.to/ajax/progress.php?id=${taskId}`;
      const statusRes = await axios.get(statusUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36",
          Referer: "https://yt.savetube.me/",
        },
      });

      if (statusRes.data.download_url) {
        downloadUrl = statusRes.data.download_url;
        title = statusRes.data.title || "";
        thumbnail = statusRes.data.thumbnail || "";
      } else if (statusRes.data.error) {
        throw new Error("Conversion failed: " + statusRes.data.error);
      }
    }

    // 4. Return structured result
    return {
      title,
      Created_by: 'Asitha Chathuranga',
      thumbnail,
      format,
      downloadUrl: downloadUrl,
    };
  } catch (err) {
    console.error("ytmp3 error:", err.message);
    return null;
  }
}

module.exports = { ytmp3 };
