import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from "@nestjs/common";
import { DonateService } from "./donate.service";
import { CreateDonateDto } from "./dto/create-donate.dto";
import { UpdateDonateDto } from "./dto/update-donate.dto";
import {
  ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth,
} from "@nestjs/swagger";
import { Donate } from "./models/donate.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("Donates")
@Controller("donate")
export class DonateController {
  constructor(private readonly donateService: DonateService) { }

  @Post()
  @ApiOperation({ summary: "Yangi donate yaratish" })
  @ApiResponse({
    status: 201,
    description: "Donate muvaffaqiyatli yaratildi✅",
    type: Donate,
  })
  @ApiResponse({ status: 400, description: "Ma’lumotlar to'liq emas yoki xato❌" })
  @ApiBody({ type: CreateDonateDto })
  create(@Body() createDonateDto: CreateDonateDto) {
    return this.donateService.create(createDonateDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha donate'larni olish" })
  @ApiResponse({
    status: 200,
    description: "Donate'lar ro'yxati muvaffaqiyatli olindi✅",
    type: [Donate],
  })
  @ApiResponse({ status: 404, description: "Hech qanday donate topilmadi❌" })
  findAll() {
    return this.donateService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Donate'ni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan donate ma’lumotlari✅",
    type: Donate,
  })
  @ApiResponse({ status: 404, description: "Berilgan ID bo'yicha donate topilmadi❌" })
  @ApiParam({ name: "id", type: Number, description: "Donate ID" })
  findOne(@Param("id") id: string) {
    return this.donateService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Donate ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Donate muvaffaqiyatli yangilandi✅",
    type: Donate,
  })
  @ApiResponse({ status: 404, description: "Donate topilmadi❌" })
  @ApiResponse({ status: 400, description: "Yangilash vaqtida xatolik❌" })
  @ApiParam({ name: "id", type: Number, description: "Donate ID" })
  @ApiBody({ type: UpdateDonateDto })
  update(@Param("id") id: string, @Body() updateDonateDto: UpdateDonateDto) {
    return this.donateService.update(+id, updateDonateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Donate'ni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Donate muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({ status: 404, description: "Donate topilmadi❌" })
  @ApiParam({ name: "id", type: Number, description: "Donate ID" })
  remove(@Param("id") id: string) {
    return this.donateService.remove(+id);
  }
}