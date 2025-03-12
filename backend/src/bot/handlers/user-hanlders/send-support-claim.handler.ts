import { TelegramBot } from 'src/bot/bot.service';
import { MessagesText } from 'src/bot/constants/messages-text';
import { BotContext } from 'src/bot/types/context.type';
import { UserService } from 'src/user/user.service';

export const sendSupportClaimHandler = async (
  ctx: BotContext,
  userService: UserService,
  telegramBot: TelegramBot,
): Promise<void> => {
  const { id, username } = ctx.from;
  let user = await userService.findOne({ id });

  if (!user) return;

  const shouldCreateTopic = ctx.session.onSupportClaim && !user.topic_id;
  if (shouldCreateTopic) {
    const { message_thread_id: topic_id } = await telegramBot.createTopic(
      username || id.toString(),
    );
    user = await userService.createOrUpdateOne({
      id,
      username,
      topic_id,
    });
  }

  if (!user.topic_id) return;

  try {
    await telegramBot.copyMessageToTopic(ctx.message, user.topic_id);
  } catch (error) {
    const { message_thread_id: topicId } = await telegramBot.createTopic(
      user.username || user.id.toString(),
    );

    await userService.createOrUpdateOne({
      id: user.id,
      topic_id: topicId,
    });
    await telegramBot.copyMessageToTopic(ctx.message, topicId);
  }

  if (ctx.session.onSupportClaim) {
    await ctx.reply(MessagesText.REASON_DONE);
    ctx.session.onSupportClaim = false;
  }
};
