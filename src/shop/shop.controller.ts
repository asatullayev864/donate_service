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
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Shop } from "./models/shop.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtRoleGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiBearerAuth()
@ApiTags("Shops")
@Controller("shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Yangi do'kon yaratish" })
  @ApiResponse({
    status: 201,
    description: "Do'kon muvaffaqiyatli yaratildi✅",
    type: Shop,
  })
  @ApiResponse({
    status: 400,
    description: "Do'kon nomi allaqachon mavjud yoki ma'lumot to'liq emas❌",
  })
  @ApiBody({ type: CreateShopDto })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha do'konlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Do'konlar ro'yxati",
    type: [Shop],
  })
  @ApiResponse({ status: 404, description: "Hech qanday do'kon topilmadi❌" })
  findAll() {
    return this.shopService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("SUPERADMIN", "ADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Do'konni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan do'kon",
    type: Shop,
  })
  @ApiResponse({
    status: 404,
    description: "Berilgan ID bo'yicha do'kon topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Do'kon ID" })
  findOne(@Param("id") id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("SUPERADMIN", "ADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Do'kon ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Do'kon muvaffaqiyatli yangilandi✅",
    type: Shop,
  })
  @ApiResponse({ status: 404, description: "Do'kon topilmadi❌" })
  @ApiResponse({ status: 400, description: "Yangilash vaqtida xatolik❌" })
  @ApiParam({ name: "id", type: Number, description: "Do'kon ID" })
  @ApiBody({ type: UpdateShopDto })
  update(@Param("id") id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("SUPERADMIN", "ADMIN", "RECIPIENT")
  @ApiOperation({ summary: "Do'konni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Do'kon muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({ status: 404, description: "Do'kon topilmadi❌" })
  @ApiParam({ name: "id", type: Number, description: "Do'kon ID" })
  remove(@Param("id") id: string) {
    return this.shopService.remove(+id);
  }
}