import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot, session } from 'grammy';
import { ForumTopic, Message, WebAppInfo } from 'grammy/types';
import { commands } from './utils/commands';
import { BotContext } from './types/context.type';
import { SessionData } from './interfaces/sessions.interface';
import { run } from '@grammyjs/runner';
import { parseMode, ParseModeFlavor } from '@grammyjs/parse-mode';

@Injectable()
export class TelegramBot {
  private bot: Bot<BotContext>;
  private mainGroupId: string | number;
  private errorLogChatId: string | number;
  private webAppInfo: string;

  constructor(private readonly configService: ConfigService) {
    this.mainGroupId = configService.get<number | string>('MAIN_GROUP');
    this.errorLogChatId = configService.get<number | string>(
      'ERROR_LOG_CHAT_ID',
    );
    this.webAppInfo = configService.get<string>('WEBAPP_URL');
    this.bot = new Bot<ParseModeFlavor<BotContext>>(
      configService.get<string>('BOT_TOKEN'),
      {
        client: { environment: 'prod' },
      },
    );
    this.bot.api.config.use(parseMode('HTML'));
    this.bot.api.setMyCommands(commands);
    this.bot.use(
      session({
        initial: (): SessionData => ({
          onSupportClaim: false,
          onMailing: false,
        }),
      }),
    );
    this.bot.catch((error) => {
      this.bot.api.sendMessage(this.errorLogChatId, JSON.stringify(error));
    });
  }

  async onApplicationBootstrap() {
    run(this.bot);
  }

  public getBot(): Bot<BotContext> {
    return this.bot;
  }

  public getMainGroupId(): string | number {
    return this.mainGroupId;
  }

  public getWebAppInfo(): string {
    return this.webAppInfo;
  }

  public async sendMessageToUser(userId: number, text: string): Promise<void> {
    await this.bot.api.sendMessage(userId, text);
  }

  public async copyMessageToTopic(
    message: Message,
    topicId: number,
  ): Promise<void> {
    await this.bot.api.copyMessage(
      this.mainGroupId,
      message.from.id,
      message.message_id,
      { message_thread_id: topicId },
    );
  }

  public async createTopic(topicName: string): Promise<ForumTopic> {
    return await this.bot.api.createForumTopic(this.mainGroupId, topicName);
  }

  public async sendErrorLog(error): Promise<void> {
    await this.bot.api.sendMessage(this.errorLogChatId, JSON.stringify(error));
  }
}
