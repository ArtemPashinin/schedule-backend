import { Injectable, OnModuleInit } from '@nestjs/common';
import { Composer } from 'grammy';
import { TelegramBot } from '../bot.service';
import { ChatType } from '../enums/chat-types.enum';
import { UserService } from 'src/user/user.service';
import { BotContext } from '../types/context.type';
import { isNotBot } from '../filters/is-bot';
import { startHandler } from '../handlers/user-hanlders/start.handler';
import { initialSupportClaimHandler } from '../handlers/user-hanlders/initial-support-claim.handler';
import { sendSupportClaimHandler } from '../handlers/user-hanlders/send-support-claim.handler';

@Injectable()
export class UserComposer implements OnModuleInit {
  private readonly composer = new Composer<BotContext>();

  constructor(
    private readonly telegramBot: TelegramBot,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    this.registerHandlers();
    this.telegramBot.getBot().chatType(ChatType.PRIVATE).use(this.composer);
  }

  private registerHandlers(): void {
    // CMD: start
    this.composer.command('start', (ctx) =>
      startHandler(ctx, this.userService, this.telegramBot),
    );
    // Callback: support
    this.composer.callbackQuery('support', (ctx) =>
      initialSupportClaimHandler(ctx),
    );
    // CMD: support
    this.composer.command('support', (ctx) => initialSupportClaimHandler(ctx));
    // MSG: any message
    this.composer
      .filter(isNotBot)
      .on('message', (ctx) =>
        sendSupportClaimHandler(ctx, this.userService, this.telegramBot),
      );
  }
}
