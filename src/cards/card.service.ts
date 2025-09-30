import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Recipient } from '../recipient/models/recipient.model';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private readonly cardModel: typeof Card,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
  ) { }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const { card_type, card_number, recipientId, expiry_date } = createCardDto;

    const existsCard = await this.cardModel.findOne({ where: { card_number } });
    if (existsCard) {
      throw new BadRequestException('This card number is already registered❌');
    }

    const recipient = await this.recipientModel.findByPk(recipientId);
    if (!recipient) {
      throw new NotFoundException('Recipient not found❌');
    }

    return await this.cardModel.create({
      card_type,
      card_number,
      recipientId,
      expiry_date,
    });
  }

  async findAll(): Promise<Card[]> {
    const cards = await this.cardModel.findAll({
      include: [
        {
          model: Recipient,
          attributes: ["name", "full_name", "email", "address"]
        }
      ]
    });
    if (!cards.length) {
      throw new NotFoundException('No cards found❌');
    }
    return cards;
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardModel.findByPk(id, {
      include: [
        {
          model: Recipient,
          attributes: ["name", "full_name", "email", "address"]
        }
      ]
    });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found❌`);
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.cardModel.findByPk(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found❌`);
    }

    if (updateCardDto.card_number) {
      const existsCard = await this.cardModel.findOne({ where: { card_number: updateCardDto.card_number } });
      if (existsCard && existsCard.id !== id) {
        throw new BadRequestException('This card number is already in use❌');
      }
    }

    await card.update(updateCardDto);
    return card;
  }

  async remove(id: number): Promise<{ message: string }> {
    const card = await this.cardModel.findByPk(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found❌`);
    }

    await card.destroy();
    return { message: 'Card successfully deleted✅' };
  }
}