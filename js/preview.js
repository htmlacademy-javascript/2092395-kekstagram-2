// Создаем массив файлов, которые можно загружать
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
// Выбираем поле загрузки изображения
const fileChooser = document.querySelector('#upload-file');
// Находим элемент, который будет показывать изображение
const preview = document.querySelector('.img-upload__preview img');

// Подписываемся на изменение поля загрузки фотографии
fileChooser.addEventListener('change', () => {
  // Получаем загруженный файл
  const file = fileChooser.files[0]; // Обращаемся к коллекции files и выбираем элемент с нулевым индексом
  // Используем свойство в котором хранится имя файла
  const fileName = file.name.toLowerCase();
  // Проверяем, оканчивается ли имя файла одним из допустимых расширений.
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it); // true или false
  });

  if (matches) {
    // Используем стандартный метод для созданияссылки файла, ссылку добавляе в preview
    preview.src = URL.createObjectURL(file);
  }
});
