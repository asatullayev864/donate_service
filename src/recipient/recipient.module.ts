import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipientSocial } from '../recipient-social/models/recipient-social.model';
import { Recipient } from './models/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Recipient])],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule {}
