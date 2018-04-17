const superagent = require("superagent");
const cheerio = require("cheerio");
const url = 'http://www.xunyingwang.com/movie/top250_douban';

superagent.get(url).end((err, res) => {
  setTimeout(() => {
    var $ = cheerio.load(res.text);
    var items = [];
    $('.container-fluid > .row').each(function (idx, element) {
      var $element = $(element);
      items.push({
        name: $element.find(".col-xs-9 h4 a").text(),
        poster: $element.find('img').attr('src'),
        rate: $element.find('.pull-right strong').text()
      });
    });
    process.send({result: items});
    process.exit(0);
  }, 200);
})