/**
 * * Рассчет текущей страницы пагинации в зависимости от количества элементов на странице
 * @param { Number } newsPerPage количество элементов на странице
 * @param { Number } currentx  текущий номер страницы пагинации
 * @return { Number }
 */
export default function pages (newsPerPage, currentx) {
  let start;

  if (newsPerPage === 4) {
    if (currentx === 1 || (currentx - 1) % 4 === 0) {
      start = Math.ceil(((currentx - 1) * 3)/4 + 1)
    } else {
      start = Math.ceil(((currentx - 1) * 3)/4)
    }

  } else {
    if (currentx  % 3 === 0) {
      start = Math.ceil(((currentx) * 4)/3 - 1)
    } else {
      start = Math.floor(((currentx) * 4)/3)
    }
  }

  return start
}