// Стандартная задержка для функции debounce (в миллисекундах).
const DEFAULT_DEBOUNCE_DELAY = 500;

// Функция ограничивает частоту вызовов
const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  debounce,
  isEscapeKey,
};
