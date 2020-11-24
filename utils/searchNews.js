/**
  * Функция для поиска новостей по слову
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