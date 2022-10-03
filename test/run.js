const {Parser} = require('../src/Parser');

const parser = new Parser();

const prg = ` 
    // single line comment
       
    "12" 
`;

const ast = parser.parse(prg);

console.log(JSON.stringify(ast, null, 2));