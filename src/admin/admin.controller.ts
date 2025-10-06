import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtRoleGuard } from '../common/guards/role.guard';
import { SelfGuard } from '../common/guards/self.guard';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // Faqat SUPERADMIN yangi admin yaratishi mumkin
  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('SUPERADMIN')
  @ApiOperation({ summary: "Yangi admin yaratish (faqat SUPERADMIN)" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi", type: Admin })
  @ApiResponse({ status: 400, description: "Email allaqachon mavjud ❌" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // SUPERADMIN ham, ADMIN ham ko‘ra oladi
  @Get()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('SUPERADMIN')
  @ApiOperation({ summary: "Barcha adminlarni olish (SUPERADMIN, ADMIN)" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  // SUPERADMIN ham, ADMIN ham bitta adminni ko‘ra oladi
  @Get(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiOperation({ summary: "Bitta adminni olish (SUPERADMIN, ADMIN)" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  // Faqat SUPERADMIN yangilashi mumkin
  @Patch(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles('SUPERADMIN')
  @ApiOperation({ summary: "Adminni yangilash (faqat SUPERADMIN)" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli yangilandi", type: Admin })
  @ApiResponse({ status: 400, description: "Xatolik (masalan email yoki eski parol noto'g'ri)" })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  // Faqat SUPERADMIN o‘chira oladi
  @Delete(":id")
  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles('SUPERADMIN', 'ADMIN')
  @ApiOperation({ summary: "Adminni o'chirish (faqat SUPERADMIN)" })
  @ApiResponse({ status: 200, description: "Admin o'chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi ❌" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}