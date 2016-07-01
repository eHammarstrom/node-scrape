const pkginfo = require('pkginfo')(module, 'version', 'name');
const targetUrl = process.argv[2];
const htmlparser = require('htmlparser2');
const request = require('request');
const Storage = require('./storage.js');
const fs = require('fs');

console.log(module.exports.name + ' ' + module.exports.version + '\n');

if (typeof targetUrl === 'undefined') {
  console.error('ERR: Provide URL argument');
  process.exit(1);
}

const parser = new htmlparser.Parser({
  onopentag: (name, attribs) => {
    if (name === 'a' && attribs.href != null)
      Storage.append(attribs.href);
  },
  onclosetag: (tagname) => {}
}, { decodeEntities: true });

request(targetUrl, (err, res, body) => {
  if (!err && res.statusCode === 200) {
    parser.write(body);
    savePdfs();
  } else {
    console.error(err);
    process.exit(1);
  }
});

parser.end();

function savePdfs() {
  let item = Storage.next();
  let i = 0;
  while (item != null) {
    if (item.includes('.pdf')) {
      request(item, (err, res, body) => {
        if (err) console.error(err);
      }).pipe(fs.createWriteStream('pdfs/' + (i++) + '.pdf'));
    }
    item = Storage.next();
  }
}
