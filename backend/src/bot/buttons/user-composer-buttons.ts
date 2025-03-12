import { InlineKeyboard } from 'grammy';
import { ButtonsText } from '../constants/buttons-text';

export const optionalButtons = new InlineKeyboard()
  .text(ButtonsText.TO_REASON, 'support')
  .url(ButtonsText.TO_CHANNEL, 'https://t.me/maiuniversity_schedule');

export const openWebAppButton = (miniAppUrl: string) => new InlineKeyboard().url(
  ButtonsText.OPEN_MINI_APP,
  miniAppUrl,
);
