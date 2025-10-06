import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RecipientService } from "./recipient.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { Recipient } from "./models/recipient.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtRoleGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { SelfGuard } from "../common/guards/self.guard";

@ApiBearerAuth()
@ApiTags("Recipients")
@Controller("recipient")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) { }

  // ❗ CREATE – faqat ADMIN yaratishi mumkin
  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN")
  @ApiOperation({ summary: "Yangi recipient yaratish" })
  @ApiResponse({ status: 201, description: "Recipient muvaffaqiyatli yaratildi✅", type: Recipient })
  @ApiResponse({ status: 400, description: "Bunday email yoki name allaqachon mavjud❌" })
  @ApiBody({ type: CreateRecipientDto })
  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientService.create(createRecipientDto);
  }

  // ❗ GET ALL – faqat ADMIN
  @Get()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Barcha recipientlarni olish" })
  @ApiResponse({ status: 200, description: "Recipientlar ro'yxati", type: [Recipient] })
  @ApiResponse({ status: 404, description: "Hech qanday recipient topilmadi❌" })
  findAll() {
    return this.recipientService.findAll();
  }

  // ❗ GET ONE – ADMIN yoki o‘z recipient
  @Get(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("SUPERADMIN", "ADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Recipientni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Topilgan recipient", type: Recipient })
  @ApiResponse({ status: 404, description: "Berilgan ID bo'yicha recipient topilmadi❌" })
  @ApiParam({ name: 'id', type: Number, description: "Recipient ID" })
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(+id);
  }

  // ❗ PATCH – ADMIN yoki o‘z recipient
  @Patch(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("SUPERADMIN", "ADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Recipient ma’lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Recipient muvaffaqiyatli yangilandi✅", type: Recipient })
  @ApiResponse({ status: 404, description: "Recipient topilmadi❌" })
  @ApiResponse({ status: 400, description: "Yangilash vaqtida xatolik❌" })
  @ApiParam({ name: 'id', type: Number, description: "Recipient ID" })
  @ApiBody({ type: UpdateRecipientDto })
  update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return this.recipientService.update(+id, updateRecipientDto);
  }

  // ❗ DELETE – faqat ADMIN
  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Recipientni o'chirish" })
  @ApiResponse({ status: 200, description: "Recipient muvaffaqiyatli o'chirildi✅" })
  @ApiResponse({ status: 404, description: "Recipient topilmadi❌" })
  @ApiParam({ name: 'id', type: Number, description: "Recipient ID" })
  remove(@Param('id') id: string) {
    return this.recipientService.remove(+id);
  }
}