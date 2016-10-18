const cuid = require('cuid');

const X_MIN = 1;
const X_MAX = 100;
const Y_MIN = 10;
const Y_MAX = 90;
const Z_MIN = 1;
const Z_MAX = 10;


const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateDatum = domain => ({
    id: cuid(),
    x: randomIntBetween(domain[0], domain[1]),
    y: randomIntBetween(Y_MIN, Y_MAX),
    z: randomIntBetween(Z_MIN, Z_MAX)
});

const generate = (n) => {
    const res = [];
    for (let i = 0; i < n; i += 1) {
        res.push(generateDatum([X_MIN, X_MAX]));
    }
    return res;
};

module.exports = { generate, generateDatum, randomIntBetween };
