const EFFECTS = {
  'none': {
    name: 'none',
    min: 0,
    max: 1,
    step: 1,
  },
  'chrome': {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'sepia': {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'marvin': {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'phobos': {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'heat': {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

let chosenEffect = EFFECTS.none; // Выбранный эффект - начальный

// Находим изображение, к которому будут применяться фильтры
const image = document.querySelector('.img-upload__preview img');
// Находим форму загрузки изображения
const uploadForm = document.querySelector('.img-upload__form');
// Находим элемент, содержащий ползунок (для скрытия/появленния)
const sliderFieldset = document.querySelector('.img-upload__effect-level');
// Находим Div в который встроим слайдер
const sliderElement = document.querySelector('.effect-level__slider');
// Находим элемент для хранения текущего значения эффекта
const effectLevel = document.querySelector('.effect-level__value');

// Проверка на эффект по умолчанию
const isDefaultFilter = () => chosenEffect === EFFECTS.none;

const resetImageStyles = () => {
  image.style.filter = 'none';
  image.className = '';
  effectLevel.value = '';
  image.classList.add(`effects__preview--${chosenEffect.name}`);
};

// Обновляем параметры слайдера
const updateSliderOptions = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
};

// Ф-я обновляет слайдер
const updateSlider = () => {
  sliderFieldset.classList.toggle('hidden', isDefaultFilter());
  resetImageStyles();
  updateSliderOptions();
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  // Ищем выбранный слайдер
  chosenEffect = EFFECTS[evt.target.value];
  updateSlider();
};

// Обновляем изображение при изменении слайдера
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  let formattedValue;

  if (chosenEffect.unit === '%') {
    formattedValue = parseInt(sliderValue, 10);
  } else {
    // Изменяем форматирование для эффектов без процентов
    formattedValue = parseFloat(sliderValue);
    // Если значение целое - выводим без десятичных знаков
    if (Number.isInteger(formattedValue)) {
      formattedValue = formattedValue.toString();
    } else {
      // Иначе оставляем один десятичный знак
      formattedValue = formattedValue.toFixed(1);
    }
  }

  image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevel.value = formattedValue;
};

// Сбрасываем эффекты
const resetEffects = () => {
  chosenEffect = EFFECTS.none;
  updateSlider();
};

// Инициализация слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max,
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower',
});

updateSlider();

// Вешаем обработчики события
uploadForm.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
