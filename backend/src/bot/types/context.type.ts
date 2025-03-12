import { Context, SessionFlavor } from 'grammy';
import { SessionData } from '../interfaces/sessions.interface';

export type BotContext = Context & SessionFlavor<SessionData>;
