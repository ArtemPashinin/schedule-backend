import { UserStatus } from '../enums/user-status.enum';
import { BotContext } from 'src/bot/types/context.type';

export async function isUserHasPermissions(ctx: BotContext): Promise<boolean> {
  const author = await ctx.getAuthor();
  return (
    author.status === UserStatus.ADMINISTRATOR ||
    author.status === UserStatus.CREATOR
  );
}
