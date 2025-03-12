import { TelegramBot } from 'src/bot/bot.service';
import { BotContext } from 'src/bot/types/context.type';
import { UserService } from 'src/user/user.service';

export const copyMessageToUserHandler = async (
  ctx: BotContext,
  userService: UserService,
  telegramBot: TelegramBot,
): Promise<void> => {
  const { message_thread_id: topicId, message_id: messageId } = ctx.message;
  const user = await userService.findOne({ topic_id: topicId });
  if (user) {
    await ctx.api.copyMessage(user.id, telegramBot.getMainGroupId(), messageId);
  }
};
