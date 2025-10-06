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
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/models/shop.model';
import { UserModule } from './user/user.module';

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
      models: [Recipient, Card, SocialMedia, RecipientSocial, Admin, Category, Shop],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    AuthModule,
    AdminModule,
    RecipientModule,
    RecipientSocialModule,
    CardModule,
    SocialMediaModule,
    CategoryModule,
    ShopModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
