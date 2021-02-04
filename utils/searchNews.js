/**
 * * Функция для поиска новостей по слову
 * @param { Array } arr массив где ищем
 * @param { String } val слово, которое ищем
 * @return { Array } массив с результатами поиска
 */
function searchNews(arr, val){
  let regexp = new RegExp(val, "gi");

  let strArrSearch = arr.map((el, ind)=>{
    if(el.title.match(regexp) != null){
      return ind;
    }
  })

  let resultArr = strArrSearch.filter((el) => el != undefined);
  let filteredNews = resultArr.map((el) => arr[el])

  return filteredNews;
}

export { searchNews };