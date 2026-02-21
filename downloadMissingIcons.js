// 更新一些失效的 icon url，嘗試另一些可能的 icons8 url
const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'assets', 'images');

const missingResources = [
    { name: 'tiger.png', url: 'https://img.icons8.com/color/200/tiger.png' },
    { name: 'monkey.png', url: 'https://img.icons8.com/color/200/monkey.png' },
    { name: 'boat.png', url: 'https://img.icons8.com/color/200/boat.png' },
    { name: 'airplane.png', url: 'https://img.icons8.com/color/200/airplane-mode-on.png' },
    { name: 'head.png', url: 'https://img.icons8.com/color/200/head-profile.png' },
    { name: 'hand.png', url: 'https://img.icons8.com/color/200/hand.png' },
    { name: 'foot.png', url: 'https://img.icons8.com/color/200/footprint.png' }, // or foot
    { name: 'mouth.png', url: 'https://img.icons8.com/color/200/lips.png' }, // or mouth
    { name: 'nose.png', url: 'https://img.icons8.com/color/200/nose.png' },
    { name: 'ear.png', url: 'https://img.icons8.com/color/200/ear.png' },
    { name: 'lamp.png', url: 'https://img.icons8.com/color/200/table-lamp.png' },
    { name: 'clouds.png', url: 'https://img.icons8.com/color/200/clouds.png' },
    { name: 'circle.png', url: 'https://img.icons8.com/color/200/filled-circle.png' },
    { name: 'square.png', url: 'https://img.icons8.com/color/200/square.png' },
    { name: 'heart.png', url: 'https://img.icons8.com/color/200/pixel-heart.png' },
    { name: 'noodles.png', url: 'https://img.icons8.com/color/200/noodles.png' },
    { name: 'meat.png', url: 'https://img.icons8.com/color/200/meat.png' },
    { name: 'soup.png', url: 'https://img.icons8.com/color/200/soup-plate.png' },
    { name: 'candy.png', url: 'https://img.icons8.com/color/200/candy.png' }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                file.close();
                fs.unlink(dest, () => reject(`Download failed. Status code: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
};

(async () => {
    console.log(`Downloading ${missingResources.length} missing resources...`);
    let count = 0;
    for (const res of missingResources) {
        const filePath = path.join(targetDir, res.name);
        try {
            await download(res.url, filePath);
            count++;
            console.log(`[${count}/${missingResources.length}] Downloaded ${res.name}`);
        } catch (e) {
            console.error(`Failed to download ${res.name}: ${e} (${res.url})`);
        }
    }
    console.log('Missing downloads completed!');
})();
