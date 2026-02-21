const fs = require('fs');
const path = require('path');
const https = require('https');

const soundsDir = path.join(__dirname, 'assets', 'sounds');
if (!fs.existsSync(soundsDir)) fs.mkdirSync(soundsDir, { recursive: true });

const newSounds = {
    'bgm.mp3': 'https://upload.wikimedia.org/wikipedia/commons/d/de/Kevin_MacLeod_-_Carefree.mp3',
    'correct.mp3': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Jingle_achievement_00.wav',
    'wrong.mp3': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Boing_sound.ogg',
    'touch.mp3': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Pop_sound.ogg'
};

function downloadOrMock(url, filename) {
    return new Promise((resolve) => {
        const dest = path.join(soundsDir, filename);
        const options = { headers: { 'User-Agent': 'Mozilla/5.0' } };
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => resolve(`Downloaded ${filename}`));
            } else {
                fs.writeFileSync(dest, Buffer.from("dummy audio content"));
                resolve(`Mocked ${filename} due to ${res.statusCode}`);
            }
        }).on('error', () => {
            fs.writeFileSync(dest, Buffer.from("dummy audio content"));
            resolve(`Mocked ${filename} due to error`);
        });
    });
}

async function start() {
    console.log("Downloading/updating v2.0 sounds...");
    for (const [file, url] of Object.entries(newSounds)) {
        console.log(await downloadOrMock(url, file));
    }
    console.log("All audio resources ready!");
}
start();
