export const MessagesText = {
  ALREADY_SEE: 'Уже увидели 👀',
  REASON_DESCRIBE: 'Подробно опиши причину обращения 💬🆘',
  WELCOME: 'Нажми кнопку ниже, чтобы открыть мини-приложение👇',
  REASON_DONE: '✅ Принято! Ожидай ответа прямо тут🐒',
  USERS: (usersCount: number | string) =>
    `Текущее количество пользователей: ${usersCount}`,
  NO_EVENT_NAME: '❌ Отсутствует название события',
  NO_EVENT: (eventTitle: string) =>
    `❌ События с названием '${eventTitle}' не найдено`,
  MAILING_START:
    'Отправь текст или медиа для рассылки, или нажми "Отмена" для отмены операции',
  MAILING_CANCEL: 'Отменено',
  MAILING_ERROR: '❌ Произошла ошибка при рассылке, попробуйте позднее',
  MAILING_DONE: (count: number) => `✅ Рассылка успешно выполнена!\nКоличетсво пользоваталей, получивших рассылку: ${count}`
} as const;
