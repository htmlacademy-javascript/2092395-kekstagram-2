// Находим Div в который встроим слайдер
const sliderElement = document.querySelector('.effect-level__slider');

// Обращаемся к библиотеке
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80, // Задаем  положение ползунка
  step: 1, // шаг движения слайдера
  connect: 'lower', // С какой стороны слайдер берет отсчет (в данном случае с минимальной)
});
