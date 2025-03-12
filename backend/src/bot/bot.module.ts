import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBot } from './bot.service';
import { UserComposer } from './composers/user.composer';
import { UserModule } from 'src/user/user.module';
import { AdminComposer } from './composers/admin.composer';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [ConfigModule, UserModule, EventModule],
  providers: [TelegramBot, UserComposer, AdminComposer],
  exports: [TelegramBot],
})
export class BotModule {}
