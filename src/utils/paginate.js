export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize); // создали новый массив (через spread оператор), чтобы не менять исходный и при переключении страниц выбираем количество эпизодов для отрисовки
};
