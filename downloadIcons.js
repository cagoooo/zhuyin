const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const resources = [
    // 原始水果
    { name: 'apple.png', url: 'https://img.icons8.com/plasticine/200/apple.png' },
    { name: 'banana.png', url: 'https://img.icons8.com/plasticine/200/banana.png' },
    { name: 'watermelon.png', url: 'https://img.icons8.com/plasticine/200/watermelon.png' },
    { name: 'strawberry.png', url: 'https://img.icons8.com/plasticine/200/strawberry.png' },
    { name: 'peach.png', url: 'https://img.icons8.com/plasticine/200/peach.png' },
    { name: 'grapes.png', url: 'https://img.icons8.com/plasticine/200/grapes.png' },
    { name: 'mandarin.png', url: 'https://img.icons8.com/plasticine/200/mandarin.png' },
    { name: 'pear.png', url: 'https://img.icons8.com/plasticine/200/pear.png' },
    { name: 'lemon.png', url: 'https://img.icons8.com/plasticine/200/lemon.png' },
    // 原始動物
    { name: 'cat.png', url: 'https://img.icons8.com/plasticine/200/cat.png' },
    { name: 'dog.png', url: 'https://img.icons8.com/plasticine/200/dog.png' },
    { name: 'rabbit.png', url: 'https://img.icons8.com/plasticine/200/rabbit.png' },
    { name: 'fish.png', url: 'https://img.icons8.com/plasticine/200/fish.png' },
    { name: 'teddy-bear.png', url: 'https://img.icons8.com/plasticine/200/teddy-bear.png' },
    { name: 'tiger.png', url: 'https://img.icons8.com/plasticine/200/tiger.png' },
    { name: 'lion.png', url: 'https://img.icons8.com/plasticine/200/lion.png' },
    { name: 'elephant.png', url: 'https://img.icons8.com/plasticine/200/elephant.png' },
    { name: 'monkey.png', url: 'https://img.icons8.com/plasticine/200/monkey.png' },
    { name: 'bird.png', url: 'https://img.icons8.com/plasticine/200/bird.png' },
    // 原始交通
    { name: 'car.png', url: 'https://img.icons8.com/plasticine/200/car.png' },
    { name: 'boat.png', url: 'https://img.icons8.com/plasticine/200/boat.png' },
    { name: 'airplane.png', url: 'https://img.icons8.com/plasticine/200/airplane-mode-on.png' },
    { name: 'train.png', url: 'https://img.icons8.com/plasticine/200/train.png' },
    { name: 'bicycle.png', url: 'https://img.icons8.com/plasticine/200/bicycle.png' },
    { name: 'bus.png', url: 'https://img.icons8.com/plasticine/200/bus.png' },
    { name: 'truck.png', url: 'https://img.icons8.com/plasticine/200/truck.png' },
    // 原始身體
    { name: 'head.png', url: 'https://img.icons8.com/plasticine/200/head.png' },
    { name: 'hand.png', url: 'https://img.icons8.com/plasticine/200/hand.png' },
    { name: 'foot.png', url: 'https://img.icons8.com/plasticine/200/foot.png' },
    { name: 'visible.png', url: 'https://img.icons8.com/plasticine/200/visible.png' },
    { name: 'mouth.png', url: 'https://img.icons8.com/plasticine/200/mouth.png' },
    { name: 'nose.png', url: 'https://img.icons8.com/plasticine/200/nose.png' },
    { name: 'ear.png', url: 'https://img.icons8.com/plasticine/200/ear.png' },
    // 原始家人
    { name: 'father.png', url: 'https://img.icons8.com/plasticine/200/father.png' },
    { name: 'mother.png', url: 'https://img.icons8.com/plasticine/200/mother.png' },
    { name: 'boy.png', url: 'https://img.icons8.com/plasticine/200/boy.png' },
    { name: 'girl.png', url: 'https://img.icons8.com/plasticine/200/girl.png' },
    { name: 'baby-boy.png', url: 'https://img.icons8.com/plasticine/200/baby-boy.png' },
    { name: 'baby-girl.png', url: 'https://img.icons8.com/plasticine/200/baby-girl.png' },
    { name: 'grandfather.png', url: 'https://img.icons8.com/plasticine/200/grandfather.png' },
    // 原始學校
    { name: 'book.png', url: 'https://img.icons8.com/plasticine/200/book.png' },
    { name: 'pen.png', url: 'https://img.icons8.com/plasticine/200/pen.png' },
    { name: 'ruler.png', url: 'https://img.icons8.com/plasticine/200/ruler.png' },
    { name: 'desk.png', url: 'https://img.icons8.com/plasticine/200/desk.png' },
    { name: 'chair.png', url: 'https://img.icons8.com/plasticine/200/chair.png' },
    { name: 'lamp.png', url: 'https://img.icons8.com/plasticine/200/lamp.png' },
    { name: 'door.png', url: 'https://img.icons8.com/plasticine/200/door.png' },

    // 新增：顏色 (Color)
    { name: 'red.png', url: 'https://img.icons8.com/plasticine/200/paint-palette.png' }, // 用調色盤代替，或找特定顏色圓圈，用 paint-brush 代替
    { name: 'yellow.png', url: 'https://img.icons8.com/plasticine/200/sun.png' }, // 黃色用太陽
    { name: 'blue.png', url: 'https://img.icons8.com/plasticine/200/water.png' }, // 藍色用水
    { name: 'green.png', url: 'https://img.icons8.com/plasticine/200/leaf.png' }, // 綠色用葉子
    { name: 'white.png', url: 'https://img.icons8.com/plasticine/200/cloud.png' }, // 白色用雲
    { name: 'black.png', url: 'https://img.icons8.com/plasticine/200/black-cat.png' }, // 黑色用黑貓

    // 新增：天氣 (Weather)
    { name: 'sunny.png', url: 'https://img.icons8.com/plasticine/200/sun.png' },
    { name: 'rain.png', url: 'https://img.icons8.com/plasticine/200/rain.png' },
    { name: 'clouds.png', url: 'https://img.icons8.com/plasticine/200/clouds.png' },
    { name: 'snow.png', url: 'https://img.icons8.com/plasticine/200/snow.png' },
    { name: 'wind.png', url: 'https://img.icons8.com/plasticine/200/wind.png' },
    { name: 'storm.png', url: 'https://img.icons8.com/plasticine/200/storm.png' },
    { name: 'rainbow.png', url: 'https://img.icons8.com/plasticine/200/rainbow.png' },

    // 新增：形狀 (Shape)
    { name: 'circle.png', url: 'https://img.icons8.com/plasticine/200/circle.png' },
    { name: 'square.png', url: 'https://img.icons8.com/plasticine/200/rectangular.png' },
    { name: 'triangle.png', url: 'https://img.icons8.com/plasticine/200/triangle.png' },
    { name: 'star.png', url: 'https://img.icons8.com/plasticine/200/star.png' },
    { name: 'heart.png', url: 'https://img.icons8.com/plasticine/200/heart.png' },

    // 新增：食物 (Food)
    { name: 'rice.png', url: 'https://img.icons8.com/plasticine/200/rice-bowl.png' },
    { name: 'noodles.png', url: 'https://img.icons8.com/plasticine/200/noodle.png' },
    { name: 'egg.png', url: 'https://img.icons8.com/plasticine/200/egg.png' },
    { name: 'meat.png', url: 'https://img.icons8.com/plasticine/200/meat.png' },
    { name: 'vegetable.png', url: 'https://img.icons8.com/plasticine/200/cabbage.png' },
    { name: 'soup.png', url: 'https://img.icons8.com/plasticine/200/soup-plate.png' },
    { name: 'ice-cream.png', url: 'https://img.icons8.com/plasticine/200/ice-cream-cone.png' },
    { name: 'cookie.png', url: 'https://img.icons8.com/plasticine/200/cookie.png' },
    { name: 'candy.png', url: 'https://img.icons8.com/plasticine/200/candy.png' }
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
    console.log(`Downloading ${resources.length} resources...`);
    let count = 0;
    for (const res of resources) {
        const filePath = path.join(targetDir, res.name);
        try {
            await download(res.url, filePath);
            count++;
            console.log(`[${count}/${resources.length}] Downloaded ${res.name}`);
        } catch (e) {
            console.error(`Failed to download ${res.name}: ${e}`);
        }
    }
    console.log('All downloads completed!');
})();
