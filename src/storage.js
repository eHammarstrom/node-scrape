const url = require('url');

class Vault {
  constructor() {
    this.links = [];
    this.currentLink = 0;
    this.pattern = /^https?:\/\//i;
  }

  append(base, link) {
    let resolved = url.resolve(base, link);
    let urlObj = url.parse(resolved);

    if (['http:', 'https:'].indexOf(urlObj.protocol) >= 0)
      this.links.push(urlObj.href);
  }

  next() {
    if (this.links.length > 0)
      return this.links[this.currentLink++];
  }

  print() {
    for (let i in this.links)
      console.log(this.links[i]);
  }
}

module.exports = new Vault();
