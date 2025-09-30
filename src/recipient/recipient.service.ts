import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';

@Injectable()
export class RecipientService {

  constructor(
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient
  ) { };

  async create(createRecipientDto: CreateRecipientDto): Promise<Recipient> {
    const { name, full_name, email, password, address } = createRecipientDto;
    if (!name || !full_name || !email || !password || !address) {
      throw new BadRequestException("Please enter all the information‼️");
    }

    const existsEmail = await this.recipientModel.findOne({ where: { email } });
    if (email) {
      throw new BadRequestException("Email already exists on the network❌")
    }
    const existsName = await this.recipientModel.findOne({ where: { name } });
    if (email) {
      throw new BadRequestException("Name already exists on the network❌")
    }

    const newRecipient = await this.recipientModel.create(createRecipientDto);
    return newRecipient;
  }

  async findAll() {
    const recipient = await this.recipientModel.findAll();
    if (!recipient) {
      throw
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} recipient`;
  }

  update(id: number, updateRecipientDto: UpdateRecipientDto) {
    return `This action updates a #${id} recipient`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipient`;
  }
}
