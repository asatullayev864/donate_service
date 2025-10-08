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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtRoleGuard } from "../common/guards/role.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { User } from "./models/user.model";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli yaratildi✅",
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday foydalanuvchi allaqachon mavjud❌",
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar ro'yxati✅",
    type: [User],
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday foydalanuvchi topilmadi❌",
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  @ApiOperation({ summary: "Foydalanuvchini ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan foydalanuvchi✅",
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: "Berilgan ID bo‘yicha foydalanuvchi topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Foydalanuvchi ID" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  @ApiOperation({ summary: "Foydalanuvchi ma’lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli yangilandi✅",
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Foydalanuvchi ID" })
  @ApiBody({ type: UpdateUserDto })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli o'chirildi✅",
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi topilmadi❌",
  })
  @ApiParam({ name: "id", type: Number, description: "Foydalanuvchi ID" })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}