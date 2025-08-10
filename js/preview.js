// Создаем массив файлов, которые можно загружать
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
// Выбираем поле загрузки изображения
const fileChooser = document.querySelector('#upload-file');
// Находим элемент, который будет показывать изображение
const preview = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');

// Подписываемся на изменение поля загрузки фотографии
fileChooser.addEventListener('change', () => {
  // Получаем загруженный файл
  const file = fileChooser.files[0]; // Обращаемся к коллекции files и выбираем элемент с нулевым индексом
  // Используем свойство в котором хранится имя файла
  const fileName = file.name.toLowerCase();
  // Проверяем, оканчивается ли имя файла одним из допустимых расширений.
  const matches = FILE_TYPES.some((it) =>
    fileName.endsWith(it) // true или false
  );

  if (matches) {
    const url = URL.createObjectURL(file);
    // Используем стандартный метод для созданияссылки файла, ссылку добавляе в preview
    preview.src = url;
    previewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  }
});

