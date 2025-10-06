import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RecipientSocialService } from './recipient-social.service';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { RecipientSocial } from './models/recipient-social.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtRoleGuard } from '../common/guards/role.guard';
import { SelfGuard } from '../common/guards/self.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Recipient-Social')
@Controller('recipient-social')
export class RecipientSocialController {
  constructor(private readonly recipientSocialService: RecipientSocialService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'RECIPIENT')
  @ApiOperation({ summary: "Yangi recipient-social qo'shish" })
  @ApiResponse({
    status: 201,
    description: 'Yaratilgan recipient-social✅',
    type: RecipientSocial,
  })
  @ApiResponse({
    status: 400,
    description: "Ma'lumot to'liq emas yoki xatolik yuz berdi❌",
  })
  @ApiBody({ type: CreateRecipientSocialDto })
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha recipient-social yozuvlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Recipient-social ro'yxati✅",
    type: [RecipientSocial],
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday recipient-social topilmadi❌",
  })
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'RECIPIENT')
  @ApiOperation({ summary: "Bitta recipient-socialni ID bo'yicha olish" })
  @ApiResponse({
    status: 200,
    description: 'Topilgan recipient-social✅',
    type: RecipientSocial,
  })
  @ApiResponse({
    status: 404,
    description: "Recipient-social topilmadi❌",
  })
  @ApiParam({ name: 'id', type: Number, description: 'Recipient-social ID' })
  findOne(@Param('id') id: string) {
    return this.recipientSocialService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'RECIPIENT')
  @ApiOperation({ summary: 'Recipient-socialni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Recipient-social muvaffaqiyatli yangilandi✅',
    type: RecipientSocial,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipient-social topilmadi❌',
  })
  @ApiResponse({
    status: 400,
    description: 'Yangilash vaqtida xatolik❌',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Recipient-social ID' })
  @ApiBody({ type: UpdateRecipientSocialDto })
  update(
    @Param('id') id: string,
    @Body() updateRecipientSocialDto: UpdateRecipientSocialDto,
  ) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'RECIPIENT')
  @ApiOperation({ summary: "Recipient-socialni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Recipient-social muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({
    status: 404,
    description: 'Recipient-social topilmadi❌',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Recipient-social ID' })
  remove(@Param('id') id: string) {
    return this.recipientSocialService.remove(+id);
  }
}