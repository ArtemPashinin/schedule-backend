import { InlineKeyboard } from "grammy";
import { ButtonsText } from "../constants/buttons-text";

export const cancelButton = new InlineKeyboard().text(ButtonsText.MAILING_CANCEL, 'cancel');