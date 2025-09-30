import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecipientSocial } from './models/recipient-social.model';

@ApiTags("Recipient-Social")
@Controller("recipient-social")
export class RecipientSocialController {
  constructor(private readonly recipientSocialService: RecipientSocialService) { }

  @Post()
  @ApiOperation({ summary: "Yangi recipient-social qo'shish" })
  @ApiResponse({ status: 201, description: "Yaratilgan recipient-social", type: RecipientSocial })
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha recipient-social yozuvlarini olish" })
  @ApiResponse({ status: 200, description: "Recipient-social ro'yxati", type: [RecipientSocial] })
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Bitta recipient-socialni ID bo'yicha olish" })
  @ApiResponse({ status: 200, description: "Topilgan recipient-social", type: RecipientSocial })
  @ApiResponse({ status: 404, description: "Recipient-social topilmadi" })
  findOne(@Param('id') id: string) {
    return this.recipientSocialService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Recipient-socialni yangilash" })
  @ApiResponse({ status: 200, description: "Yangilangan recipient-social", type: RecipientSocial })
  @ApiResponse({ status: 404, description: "Recipient-social topilmadi" })
  update(
    @Param('id') id: string,
    @Body() updateRecipientSocialDto: UpdateRecipientSocialDto,
  ) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Recipient-socialni o'chirish" })
  @ApiResponse({ status: 200, description: "Recipient-social muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Recipient-social topilmadi" })
  remove(@Param('id') id: string) {
    return this.recipientSocialService.remove(+id);
  }
}