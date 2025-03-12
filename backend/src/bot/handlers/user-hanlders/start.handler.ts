import { BotContext } from 'src/bot/types/context.type';
import { UserDto } from 'src/user/interfaces/dto/user.dto';
import { TelegramBot } from 'src/bot/bot.service';
import { createWelcomeMessage } from 'src/bot/utils/create-welcome-message';
import { UserService } from 'src/user/user.service';
import { MessagesText } from 'src/bot/constants/messages-text';
import {
  openWebAppButton,
  optionalButtons,
} from 'src/bot/buttons/user-composer-buttons';
import { initialSessionData } from 'src/bot/constants/initial-session-data';
import { initialSupportClaimHandler } from './initial-support-claim.handler';

export const startHandler = async (
  ctx: BotContext,
  userService: UserService,
  telegramBot: TelegramBot,
): Promise<void> => {
  ctx.session = initialSessionData;
  if (ctx.match === 'support') {
    await initialSupportClaimHandler(ctx);
    return;
  }

  const { id, username, language_code, last_name, first_name } = ctx.from;
  const user: UserDto = {
    id,
    username,
    language_code,
    last_name,
    first_name,
  };

  await userService.createOrUpdateOne(user);

  const welcomeMessage = await ctx.reply(MessagesText.WELCOME, {
    reply_markup: openWebAppButton(telegramBot.getWebAppInfo()),
  });

  await ctx.pinChatMessage(welcomeMessage.message_id);

  setTimeout(async () => {
    await ctx.reply(createWelcomeMessage(), {
      link_preview_options: { is_disabled: true },
      reply_markup: optionalButtons,
    });
  }, 30000);
};
