const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');

// Ф-я масштабирования изображения
const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`; // Делим на 100 т.к. в CSS 1= 100%
  scaleValue.value = `${value}%`; // Обновляем значение в поле
};

// Ф-я уменьшает масштаб изображения
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10); // Получаем текущее значение
  let newValue = currentValue - SCALE_STEP; // Уменьшаем на шаг
  // Проверяем, чтобы не выйти за минимальный масштаб
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scaleImage(newValue); // Применяем изменения
};
// Ф-я увеличивает масштаб изображения
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage();
};

// Назначаем обработчики события на соответствующие кнопки
smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
