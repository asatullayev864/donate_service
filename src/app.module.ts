import { Module } from '@nestjs/common';
import { RecipientModule } from './recipient/recipient.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './recipient/models/recipient.model';
import { CardModule } from './cards/card.module';
import { Card } from './cards/models/card.model';
import { SocialMediaModule } from './social_media/social_media.module';
import { SocialMedia } from './social_media/models/social_media.model';
import { RecipientSocialModule } from './recipient-social/recipient-social.module';
import { RecipientSocial } from './recipient-social/models/recipient-social.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Recipient, Card, SocialMedia, RecipientSocial],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    RecipientModule,
    CardModule,
    SocialMediaModule,
    RecipientSocialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
