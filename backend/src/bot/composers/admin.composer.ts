import { Injectable, OnModuleInit } from '@nestjs/common';
import { Composer } from 'grammy';
import { TelegramBot } from '../bot.service';
import { UserService } from 'src/user/user.service';
import { ChatType } from '../enums/chat-types.enum';
import {
  isMessageMainTopic,
  isMessageTopic,
} from '../filters/is-message-main-topic';
import { isUserHasPermissions } from '../filters/is-user-has-premissions';
import { EventService } from 'src/event/event.service';
import { BotContext } from 'src/bot/types/context.type';
import { isEventMounted } from '../filters/is-event-mounted';
import { Chat } from 'grammy/types';
import { usersHandler } from '../handlers/admin-handlers/users.handler';
import { eventsHandler } from '../handlers/admin-handlers/event.handler';
import { cancelHandler } from '../handlers/admin-handlers/cancel.handler';
import { mailingHandler } from '../handlers/admin-handlers/mailing.handler';
import { dispatchHandler } from '../handlers/admin-handlers/dispatch.handler';
import { copyMessageToUserHandler } from '../handlers/admin-handlers/copy-message-to-user.handler';

@Injectable()
export class AdminComposer implements OnModuleInit {
  private readonly composer = new Composer<BotContext>();

  constructor(
    private readonly telegramBot: TelegramBot,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  async onModuleInit() {
    this.registerHandlers();
    this.telegramBot
      .getBot()
      .chatType(ChatType.SUPERGROUP)
      .filter((ctx) => !ctx.from.is_bot)
      .filter(
        (ctx) => (ctx.chat as Chat)?.id == this.telegramBot.getMainGroupId(),
      )
      .use(this.composer);
  }

  private registerHandlers(): void {
    // CMD: users
    this.composer
      .filter(isMessageMainTopic)
      .filter(isUserHasPermissions)
      .command('users', (ctx) => usersHandler(ctx, this.userService));
    // CMD: events
    this.composer
      .filter(isMessageMainTopic)
      .filter(isUserHasPermissions)
      .command('events', (ctx) => eventsHandler(ctx, this.eventService));
    // CMD: mailing
    this.composer
      .filter(isMessageMainTopic)
      .filter(isUserHasPermissions)
      .command('mailing', (ctx) => mailingHandler(ctx, this.eventService));
    // MSG: mailing any message
    this.composer
      .filter(isMessageMainTopic)
      .filter(isUserHasPermissions)
      .filter(isEventMounted)
      .on('message', (ctx) => dispatchHandler(ctx, this.eventService));
    // MSG: any message to user via topic
    this.composer
      .filter(isMessageTopic)
      .on('message', (ctx) => copyMessageToUserHandler(ctx, this.userService, this.telegramBot));
    // Callback: cancel mailing
    this.composer.callbackQuery('cancel', (ctx) => cancelHandler(ctx));
  }
}
