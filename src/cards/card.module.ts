import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { Recipient } from '../recipient/models/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Card, Recipient])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
