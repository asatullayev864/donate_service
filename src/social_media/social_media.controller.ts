import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialMediaService } from './social_media.service';
import { CreateSocialMediaDto } from './dto/create-social_media.dto';
import { UpdateSocialMediaDto } from './dto/update-social_media.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SocialMedia } from './models/social_media.model';

@ApiBearerAuth()
@ApiTags('Social Media')
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) { }

  @Post()
  @ApiOperation({ summary: "Yangi social media qo'shish" })
  @ApiResponse({ status: 201, description: "Social media muvaffaqiyatli yaratildi", type: SocialMedia })
  @ApiResponse({ status: 400, description: "Bunday social_media allaqachon mavjud❌" })
  @ApiBody({ type: CreateSocialMediaDto })
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha social media yozuvlarini olish" })
  @ApiResponse({ status: 200, description: "Social media ro'yxati", type: [SocialMedia] })
  @ApiResponse({ status: 404, description: "Hech qanday social media topilmadi❌" })
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Bitta social media ma’lumotini olish" })
  @ApiResponse({ status: 200, description: "Topilgan social media", type: SocialMedia })
  @ApiResponse({ status: 404, description: "Berilgan ID bo'yicha social media topilmadi❌" })
  @ApiParam({ name: 'id', type: Number, description: "Social media ID" })
  findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Social media ma’lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Social media muvaffaqiyatli yangilandi", type: SocialMedia })
  @ApiResponse({ status: 404, description: "Social media topilmadi❌" })
  @ApiResponse({ status: 400, description: "Bunday social_media allaqachon mavjud❌" })
  @ApiParam({ name: 'id', type: Number, description: "Social media ID" })
  @ApiBody({ type: UpdateSocialMediaDto })
  update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Social media yozuvini o'chirish" })
  @ApiResponse({ status: 200, description: "Social media muvaffaqiyatli o'chirildi✅" })
  @ApiResponse({ status: 404, description: "Social media topilmadi❌" })
  @ApiParam({ name: 'id', type: Number, description: "Social media ID" })
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}