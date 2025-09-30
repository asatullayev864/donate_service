import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { SocialMedia } from './models/social_media.model';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia) private readonly socialMediaModel: typeof SocialMedia,
  ) { }

  async create(createSocialMediaDto: CreateSocialMediaDto): Promise<SocialMedia> {
    const { social_media, iconic_url } = createSocialMediaDto;

    const exists = await this.socialMediaModel.findOne({ where: { social_media } });
    if (exists) {
      throw new BadRequestException(`Social media "${social_media}" already exists❌`);
    }

    return await this.socialMediaModel.create({ social_media, iconic_url });
  }



  async findAll(): Promise<SocialMedia[]> {
    const all = await this.socialMediaModel.findAll();
    if (!all.length) {
      throw new NotFoundException('No social media records found❌');
    }
    return all;
  }



  async findOne(id: number): Promise<SocialMedia> {
    const socialMedia = await this.socialMediaModel.findByPk(id);
    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found❌`);
    }
    return socialMedia;
  }



  async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
    const socialMedia = await this.socialMediaModel.findByPk(id);
    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found❌`);
    }

    if (updateSocialMediaDto.social_media) {
      const exists = await this.socialMediaModel.findOne({
        where: { social_media: updateSocialMediaDto.social_media },
      });
      if (exists && exists.id !== id) {
        throw new BadRequestException(
          `Social media "${updateSocialMediaDto.social_media}" already exists❌`,
        );
      }
    }

    await this.socialMediaModel.update(updateSocialMediaDto, { where: { id } });
    return await this.socialMediaModel.findOne({where: {id}});
  }



  async remove(id: number): Promise<{ message: string }> {
    const socialMedia = await this.socialMediaModel.findByPk(id);
    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found❌`);
    }

    await socialMedia.destroy();
    return { message: 'Social media successfully deleted✅' };
  }
}