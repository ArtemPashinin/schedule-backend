import { BotContext } from "src/bot/types/context.type";
import { createEventMessages } from "src/bot/utils/create-event-message";
import { EventService } from "src/event/event.service";

 export const eventsHandler = async (ctx: BotContext, eventService: EventService): Promise<void> => {
    const events = await eventService.findAll();
    const text = createEventMessages(events);
    await ctx.reply(text, { parse_mode: 'HTML' });
  }
