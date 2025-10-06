import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./models/card.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtRoleGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiBearerAuth()
@ApiTags("Cards")
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Yangi card yaratish" })
  @ApiResponse({
    status: 201,
    description: "Card muvaffaqiyatli yaratildi✅",
    type: Card,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday card number allaqachon mavjud❌",
  })
  @ApiResponse({
    status: 404,
    description: "Recipient topilmadi❌",
  })
  @ApiBody({ type: CreateCardDto })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Barcha cardlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Cardlar ro'yxati✅",
    type: [Card],
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday card topilmadi❌",
  })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Cardni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan card✅",
    type: Card,
  })
  @ApiResponse({
    status: 404,
    description: "Berilgan ID bo'yicha card topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Card ID" })
  findOne(@Param("id") id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Card ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Card muvaffaqiyatli yangilandi✅",
    type: Card,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday card number allaqachon mavjud❌",
  })
  @ApiResponse({
    status: 404,
    description: "Card topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Card ID" })
  @ApiBody({ type: UpdateCardDto })
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Cardni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Card muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({
    status: 404,
    description: "Card topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Card ID" })
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}