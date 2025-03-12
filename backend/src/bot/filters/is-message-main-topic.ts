import { BotContext } from '../types/context.type';

export function isMessageTopic(
  ctx: BotContext,
): ctx is BotContext & { message: { message_thread_id?: number } } {
  return ctx.message?.message_thread_id !== undefined;
}

export function isMessageMainTopic(
  ctx: BotContext,
): ctx is BotContext & { message: { message_thread_id?: number } } {
  return !isMessageTopic(ctx);
}
