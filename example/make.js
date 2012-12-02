var fs = require('fs');
var cjs = require('../node.js');
var filename = process.argv[2];
var myCode = fs.readFileSync(filename + ".cjs");
var code = cjs.make(myCode);
fs.writeFileSync(filename + ".html", code);
