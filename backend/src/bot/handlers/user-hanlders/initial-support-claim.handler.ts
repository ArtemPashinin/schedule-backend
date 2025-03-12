import { MessagesText } from 'src/bot/constants/messages-text';
import { BotContext } from 'src/bot/types/context.type';

export const initialSupportClaimHandler = async (ctx: BotContext): Promise<void> => {
  if (ctx.callbackQuery) await ctx.answerCallbackQuery();
  if (ctx.session.onSupportClaim) {
    ctx.reply(MessagesText.ALREADY_SEE);
    if (!ctx.callbackQuery) await ctx.deleteMessage();
    return;
  }
  ctx.session.onSupportClaim = true;

  await ctx.reply(MessagesText.REASON_DESCRIBE);
  if (!ctx.callbackQuery) await ctx.deleteMessage();
};
