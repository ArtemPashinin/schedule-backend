import { MessagesText } from 'src/bot/constants/messages-text';
import { BotContext } from 'src/bot/types/context.type';
import { EventService } from 'src/event/event.service';

export const dispatchHandler = async (
  ctx: BotContext,
  eventService: EventService,
): Promise<void> => {
  const event = await eventService.findOne({
    title: ctx.session.eventTitle,
  });

  await ctx.api.deleteMessage(ctx.chatId, ctx.session.cancelMessageId);
  ctx.session.onMailing = null;
  ctx.session.eventTitle = null;

  if (!event) {
    await ctx.reply(MessagesText.MAILING_ERROR);
    return;
  }
  const results = await Promise.all(
    event.subscribers_id.map(async (id) => {
      try {
        await ctx.api.copyMessage(id, ctx.chatId, ctx.message.message_id);
        return 1;
      } catch {
        return 0;
      }
    }),
  );

  const notifiedUsersCount = results.reduce((acc, success) => acc + success, 0);

  await ctx.reply(MessagesText.MAILING_DONE(notifiedUsersCount));
};
