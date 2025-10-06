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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtRoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Category } from './models/category.model';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya muvaffaqiyatli yaratildi✅",
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "Kategoriya nomi allaqachon mavjud yoki xatolik yuz berdi❌",
  })
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriyalar ro'yxati✅",
    type: [Category],
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday kategoriya topilmadi❌",
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiOperation({ summary: "Kategoriya ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan kategoriya✅",
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: "Berilgan ID bo'yicha kategoriya topilmadi❌",
  })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @ApiOperation({ summary: "Kategoriyani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya muvaffaqiyatli yangilandi✅",
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: "Kategoriya topilmadi❌",
  })
  @ApiResponse({
    status: 400,
    description: "Yangilash vaqtida xatolik yuz berdi❌",
  })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID' })
  @ApiBody({ type: UpdateCategoryDto })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles('SUPERADMIN')
  @ApiOperation({ summary: "Kategoriyani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({
    status: 404,
    description: "Kategoriya topilmadi❌",
  })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}