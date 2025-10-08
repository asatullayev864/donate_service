import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          
        }
      })
    })
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
