// Находим изображение, к которому будут применяться фильтры
const image = document.querySelector('.img-upload__preview img');
// Находим форму загрузки изображения
const uploadForm = document.querySelector('.img-upload__form');
// Находим Div в который встроим слайдер
const sliderElement = document.querySelector('.effect-level__slider');
// Находим элемент для хранения текущего значения эффекта
const effectLevel = document.querySelector('.effect-level__value');

// Массив объектов, описывающих доступные фильтры
const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0]; // Эффект по умолчанию
let chosenEffect = DEFAULT_EFFECT; // Выбранный эффект

// Проверка на эффект по умолчанию
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

// Ф-я обновляет слайдер
const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  // Обновляем параметры слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  // Ищем выбранный слайдер
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};
// Обновляем изображение при изменении слайдера
const onSliderUpdate = () => {
  // Сбрасываем предыдущие стили
  image.style.filter = 'none';
  image.className = '';
  effectLevel.value = '';
  // Выходим если поле 'none'
  if (isDefault()) {
    return;
  }
  // Применяем фильтр
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  image.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue; // Сохраняем значение
};
// Сбрасываем эффекты
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
// Инициализация слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();
// Вешаем обработчики события
uploadForm.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
