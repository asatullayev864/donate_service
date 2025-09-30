import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
import * as bcrypt from 'bcrypt';

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
    if (existsEmail) {
      throw new BadRequestException("Email already exists on the network❌")
    }
    const existsName = await this.recipientModel.findOne({ where: { name } });
    if (existsName) {
      throw new BadRequestException("Name already exists on the network❌")
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newRecipient = await this.recipientModel.create({
      name,
      full_name,
      email,
      password: hashedPassword,
      address
    });
    return newRecipient;
  }

  async findAll(): Promise<Recipient[]> {
    const recipients = await this.recipientModel.findAll();
    if (recipients.length === 0) {
      throw new NotFoundException("No data yet❌");
    }
    return recipients;
  }

  async findOne(id: number): Promise<Recipient> {
    const recipient = await this.recipientModel.findOne({ where: { id } });
    if (!recipient) {
      throw new NotFoundException("No information found for this ID❌");
    }
    return recipient;
  }

  async update(id: number, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.recipientModel.findOne({ where: { id } });
    if (!recipient) {
      throw new NotFoundException("No information found for this ID❌");
    }

    const { name, email, currentPassword, new_password } = updateRecipientDto;
    if (name) {
      const existsName = await this.recipientModel.findOne({ where: { name } });
      if (existsName && existsName.id !== id) {
        throw new BadRequestException("Such a name is used❗️");
      }
    }
    if (email) {
      const existsEmail = await this.recipientModel.findOne({ where: { email } });
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException("This email is busy❗️");
      }
    }
    if (currentPassword && new_password) {
      const verifyPassword = await bcrypt.compare(currentPassword, recipient.password);
      if (!verifyPassword) {
        throw new UnauthorizedException("Password noto'g'ri");
      }
      const hashedPassword = await bcrypt.hash(new_password, 7);
      updateRecipientDto.password = hashedPassword;
    }

    await this.recipientModel.update(updateRecipientDto, { where: { id } });
    return await this.recipientModel.findOne({ where: { id } });
  }

  async remove(id: number) {
    const recipient = await this.recipientModel.findOne({ where: { id } });
    if (!recipient) {
      throw new NotFoundException("No information found for this ID❌");
    }
    await this.recipientModel.destroy({ where: { id } });
    return { message: "Recipient successfully deleted✅" };
  }
}
