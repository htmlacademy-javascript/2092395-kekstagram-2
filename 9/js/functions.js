// Проверка на длину строки
const validateString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};
console.log(validateString('проверяемая строка', 20));
console.log(validateString('проверяемая строка', 18));
console.log(validateString('проверяемая строка', 10));

// Проверка на полиндром
const checkPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = newString.length - 1; i > -1; i = i - 1) {
    emptyString += newString.at(i);
  }

  if (emptyString === newString) {
    return true;
  }
  return false;
};

console.log(checkPalindrome('топот'));
console.log(checkPalindrome('ДовОд'));
console.log(checkPalindrome('Кекс'));
console.log(checkPalindrome('Лёша на полке клопа нашёл'));

// Проверка на то, что встреча проходит в рабочее время
const isMeetingInWorkDay = (workStart, workEnd, meetingStart, duration) => {

  function timeToMinutes(timeStr) {
    // Разбивает строку посимвольно, возвращает массив строк
    // Массив строк переводит в массив чисел
    // Деструктурирует массив и записывает значения в переменные hours и minutes
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  //Перевод времени в минуты для сравнения
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;
  // Проверяет на истину
  // Начало встречи не раньше начала рабочего дня и
  return meetingStartMinutes >= workStartMinutes &&
  // Конец встречи не позже конца рабочего дня
    meetingEndMinutes <= workEndMinutes;
};

console.log(isMeetingInWorkDay('08:00', '17:30', '14:00', 90));
console.log(isMeetingInWorkDay('8:0', '10:0', '8:0', 120));
console.log(isMeetingInWorkDay('08:00', '14:30', '14:00', 90));
console.log(isMeetingInWorkDay('14:00', '17:30', '08:0', 90));
console.log(isMeetingInWorkDay('8:00', '17:30', '08:00', 900));
