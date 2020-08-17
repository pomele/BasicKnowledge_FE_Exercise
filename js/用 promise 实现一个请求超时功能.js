// promise 的状态只能由 pending -> fulfilled，或者 pending -> rejected，并且只能进行一次改变
function promiseWithTimeout(url, timeout = 3000) {
    return new Promise((resolve, reject) => {
        fetch(url).then(data => data.json()).then(data => resolve(data)); // fetch 先得到结果就 resolve
        setTimeout(() => reject(Error('time is out!')), timeout); // 时间到了还没 fetch 到就 reject
    });
}

promiseWithTimeout('http://localhost:8080/data.json')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// server.js 测试
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

app.use('/data.json', (req, res) => {
    setTimeout(() => res.end(JSON.stringify({ a: 1 })), Math.floor(Math.random() * 6 * 1000));
});

app.listen(8080, () => console.log('the app is running at http://localhost:8080'));
