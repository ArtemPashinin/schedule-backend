import { BotContext } from '../types/context.type';

export async function isEventMounted(ctx: BotContext): Promise<boolean> {
  return Boolean(ctx.session.eventTitle?.trim());
}
