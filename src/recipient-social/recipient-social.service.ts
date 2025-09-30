import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { RecipientSocial } from './models/recipient-social.model';
import { Recipient } from '../recipient/models/recipient.model';
import { SocialMedia } from '../social_media/models/social_media.model';

@Injectable()
export class RecipientSocialService {
  constructor(
    @InjectModel(RecipientSocial) private readonly recipientSocialModel: typeof RecipientSocial,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
    @InjectModel(SocialMedia) private readonly socialMediaModel: typeof SocialMedia,
  ) { }

  async create(createRecipientSocialDto: CreateRecipientSocialDto): Promise<RecipientSocial> {
    const { recipientId, socialId, social_url } = createRecipientSocialDto;

    const recipient = await this.recipientModel.findByPk(recipientId);
    if (!recipient) {
      throw new NotFoundException("Recipient topilmadi❌");
    }

    const social = await this.socialMediaModel.findByPk(socialId);
    if (!social) {
      throw new NotFoundException("Social media topilmadi❌");
    }

    const exists = await this.recipientSocialModel.findOne({
      where: { recipientId, socialId },
    });
    if (exists) {
      throw new BadRequestException("Bu recipientda ushbu social media allaqachon mavjud❌");
    }

    return await this.recipientSocialModel.create({
      recipientId,
      socialId,
      social_url,
    });
  }

  async findAll(): Promise<RecipientSocial[]> {
    const socials = await this.recipientSocialModel.findAll({
      include: [
        { model: Recipient, attributes: ['id', 'name', 'full_name', 'email'] },
        { model: SocialMedia, attributes: ['id', 'social_media', 'iconic_url'] },
      ],
    });

    if (!socials.length) {
      throw new NotFoundException("Hech qanday recipient-social topilmadi❌");
    }

    return socials;
  }

  async findOne(id: number): Promise<RecipientSocial> {
    const social = await this.recipientSocialModel.findByPk(id, {
      include: [
        { model: Recipient, attributes: ['id', 'name', 'full_name', 'email'] },
        { model: SocialMedia, attributes: ['id', 'social_media', 'iconic_url'] },
      ],
    });
    if (!social) {
      throw new NotFoundException(`ID ${id} bo'yicha recipient-social topilmadi❌`);
    }
    return social;
  }

  async update(id: number, updateRecipientSocialDto: UpdateRecipientSocialDto) {
    const social = await this.recipientSocialModel.findByPk(id);
    if (!social) {
      throw new NotFoundException(`ID ${id} bo'yicha recipient-social topilmadi❌`);
    }

    await this.recipientSocialModel.update(updateRecipientSocialDto, { where: { id } });
    return await this.recipientSocialModel.findOne({ where: { id } });
  }

  async remove(id: number): Promise<{ message: string }> {
    const social = await this.recipientSocialModel.findByPk(id);
    if (!social) {
      throw new NotFoundException(`ID ${id} bo'yicha recipient-social topilmadi❌`);
    }

    await social.destroy();
    return { message: "Recipient-social muvaffaqiyatli o'chirildi✅" };
  }
}