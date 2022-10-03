const {Parser} = require('../src/Parser');

const parser = new Parser();

const prg = `"12"`;

const ast = parser.parse(prg);

console.log(JSON.stringify(ast, null, 2));