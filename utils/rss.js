/**
 * * Функция конвертации RSS в объект
 * @param {*} incData XML
 * @return {*} JSON
 */
function rssToJSON(incData){
  let res;
	var parseString = require('xml2js').parseString;
	parseString(incData, function (err, result) {
		res = result;
	});
	return res;
}

/**
 * * Функция приведения входящего объекта из RSS к общему виду
 * @param {*} incData JSON
 * @return {*} JSON
 */
function newsConvert(incData){
  let newsInc = incData.rss.channel[0].item;
	let url = incData.rss.channel[0].link[0];

  newsInc = newsInc.map((el) => {
		let {title, link, pubDate, description, enclosure } = el;
		return {
      title: title[0],
      link: link[0],
      pubDate: pubDate[0],
      description: description[0],
      enclosure: enclosure[0]['$'].url,
      url: url
		}
  });
  return newsInc;
}

/**
 * * Функция сортировки массива новостей по времени публикации
 * @param { Array } arr массив новостей
 * @return { Array } массив новостей отсортированный по времени
 */
function sortNews(arr){
  return  arr.sort((a, b) => {
    return ('' + b.pubDate).localeCompare(a.pubDate);
  });
}

export { rssToJSON, newsConvert, sortNews };