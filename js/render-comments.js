const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment').cloneNode(true); // Клонируем шаблон заранее
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

// Рендер следующей порции комментариев
const renderNextComments = () => {
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = currentCount + renderedComments.length;

  // Создаем фрагмент и добавляем комментарии
  const fragment = document.createDocumentFragment();
  renderedComments.forEach((comment) => {
    const commentElement = socialCommentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);

  // Обновляем счетчик
  commentsCount.querySelector('.social__comment-shown-count').textContent = renderedCommentsLength;
  commentsCount.querySelector('.social__comment-total-count').textContent = comments.length;

  // Скрываем кнопку, если все комментарии загружены
  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

// Очистка комментариев и сброс состояния
const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden'); // Всегда показываем кнопку при закрытии
  commentsLoader.removeEventListener('click', renderNextComments); // Удаляем старый обработчик
};

// Основная функция рендера комментариев
const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  clearComments(); // Сбрасываем состояние перед новым рендером
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments); // Вешаем обработчик
};

export { clearComments, renderComments };
