import { BotContext } from '../types/context.type';

export function isOnSupportClaim(ctx: BotContext): boolean {
  return ctx.session.onSupportClaim;
}

export function isNotOnSupportClaim(ctx: BotContext): boolean {
    return !isOnSupportClaim(ctx);
  }
