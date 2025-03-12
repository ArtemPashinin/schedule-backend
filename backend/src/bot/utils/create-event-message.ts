import { Event } from 'src/event/schemas/event.schems';

export const createEventMessages = (events: Event[]): string => {
  if (events.length > 0) {
    const eventTitles = events
      .map(({ title }) => `<code>${title}</code>`)
      .join('\n');
    return `
    ${eventTitles}

Используй команду /mailing 'название собитыия' для рассылки по выбранному событию.
    `;
  }
  return 'Событий пока нет';
};
