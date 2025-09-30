import { Module } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { SocialMediaController } from './social_media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialMedia } from './models/social_media.model';

@Module({
  imports: [SequelizeModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule { }
