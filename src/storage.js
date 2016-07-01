class Vault {
  constructor() {
    this.links = [];
    this.currentLink = 0;
    this.pattern = /^https?:\/\//i;
  }

  // Currently only handles absolute urls
  append(link, base) {
    if (this.links.indexOf(link) === -1 && this.pattern.test(link)) {
      this.links.push(link);
    }
  }

  next() {
    if (this.links.length > 0)
      return this.links[this.currentLink++];
  }

  print() {
    console.log('printing storage')
    for (let i in this.links)
      console.log(this.links[i]);
  }
}

module.exports = new Vault();
