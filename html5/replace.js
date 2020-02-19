var fs = require('fs')
var file = '../rest/dist/index.html';
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data
    .replace(/runtime/g, '/assets/runtime')
    .replace(/polyfills/g, '/assets/polyfills')
    .replace(/main/g, '/assets/main')
    .replace(/scripts\./g, '/assets/scripts.')
    .replace(/"styles\./g, '"/assets/styles.');

  fs.writeFile(file, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});