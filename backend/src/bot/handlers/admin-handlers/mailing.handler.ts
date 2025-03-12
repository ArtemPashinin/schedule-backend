import { cancelButton } from "src/bot/buttons/admin-composer-buttons";
import { MessagesText } from "src/bot/constants/messages-text";
import { BotContext } from "src/bot/types/context.type";
import { EventService } from "src/event/event.service";

export const mailingHandler = async (ctx: BotContext, eventService: EventService): Promise<void> => {
    const eventTitle = ctx.match.toString();
    if (eventTitle === '') {
      await ctx.reply(MessagesText.NO_EVENT_NAME);
      return;
    }
    
    const event = await eventService.findOne({ title: eventTitle });
    
    if (!event) {
      await ctx.reply(MessagesText.NO_EVENT(event.title));
      return;
    }

    ctx.session.eventTitle = eventTitle;
    
    const { message_id } = await ctx.reply(
      MessagesText.MAILING_START,
      { reply_markup: cancelButton },
    );
    ctx.session.cancelMessageId = message_id;
  }