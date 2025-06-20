// const validateString = (string, maxLength) => {
//   if (string.length <= maxLength) {
//     return true;
//   }
//   return false;
// };
// console.log(validateString('проверяемая строка', 20));
// console.log(validateString('проверяемая строка', 18));
// console.log(validateString('проверяемая строка', 10));


// const checkPalindrome = (string) => {
//   const newString = string.replaceAll(' ', '').toLowerCase();
//   let emptyString = '';
//   for (let i = newString.length - 1; i > -1; i = i - 1) {
//     emptyString += newString.at(i);
//   }

//   if (emptyString === newString) {
//     return true;
//   }
//   return false;
// };

// console.log(checkPalindrome('топот'));
// console.log(checkPalindrome('ДовОд'));
// console.log(checkPalindrome('Кекс'));
// console.log(checkPalindrome('Лёша на полке клопа нашёл'));

