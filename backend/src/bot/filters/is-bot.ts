import { BotContext } from '../types/context.type';

export const isBot = (ctx: BotContext): boolean => {
  return ctx.from?.is_bot || false;
};

export const isNotBot = (ctx: BotContext): boolean => {
  return !isBot(ctx);
};
