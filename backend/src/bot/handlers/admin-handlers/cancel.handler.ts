import { MessagesText } from "src/bot/constants/messages-text";
import { BotContext } from "src/bot/types/context.type";

export const cancelHandler = async (ctx: BotContext): Promise<void>  => {
    ctx.session.eventTitle = null;
    ctx.session.onMailing = null;
    await ctx.deleteMessage();
    await ctx.reply(MessagesText.MAILING_CANCEL);
  }