function divide(numerator, denominator) {

    return new Promise((resolve, reject) => {
        if(typeof numerator !== 'number'|| typeof denominator !== 'number') {
            reject(new Error('Must be number!'));
        }

        console.log('After validating type...');

        if(denominator === 0) {
            reject(new Error("Cannot divide by 0!"));
        }

        console.log('After validating non-zero denominator...');

        resolve(numerator / denominator);
    });
}


divide(3, 0)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .then(r => console.log(r));

// catch的值会传给下一个then的reject，就是说catch之后会继续执行代码

