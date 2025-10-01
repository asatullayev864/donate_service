import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';

@ApiTags('Admin')
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi", type: Admin })
  @ApiResponse({ status: 400, description: "Email allaqachon mavjud ❌" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta adminni olish" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash (parolni ham o'zgartirish mumkin)" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli yangilandi", type: Admin })
  @ApiResponse({ status: 400, description: "Xatolik (masalan email yoki eski parol noto'g'ri)" })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 200, description: "Admin o'chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}