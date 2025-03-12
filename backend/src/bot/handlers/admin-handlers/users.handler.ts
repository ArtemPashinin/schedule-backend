import { MessagesText } from 'src/bot/constants/messages-text';
import { BotContext } from 'src/bot/types/context.type';
import { UserService } from 'src/user/user.service';

export const usersHandler = async (
  ctx: BotContext,
  userService: UserService,
): Promise<void> => {
  const usersCount = await userService.getCount();
  await ctx.reply(MessagesText.USERS(usersCount));
};
