import { Module } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { RecipientSocialController } from './recipient-social.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipientSocial } from './models/recipient-social.model';
import { Recipient } from '../recipient/models/recipient.model';
import { SocialMedia } from '../social_media/models/social_media.model';

@Module({
  imports: [
    SequelizeModule.forFeature([RecipientSocial, Recipient, SocialMedia])
  ],
  controllers: [RecipientSocialController],
  providers: [RecipientSocialService],
})
export class RecipientSocialModule {}
