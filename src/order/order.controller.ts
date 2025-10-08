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
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Order } from "./models/order.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { JwtRoleGuard } from "../common/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { SelfGuard } from "../common/guards/self.guard";

@ApiBearerAuth()
@ApiTags("Orders")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("USER", "ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Yangi order yaratish" })
  @ApiResponse({ status: 201, description: "Order muvaffaqiyatli yaratildi✅", type: Order })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma’lumotlar❌" })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Barcha orderlarni olish (faqat adminlar uchun)" })
  @ApiResponse({ status: 200, description: "Orderlar ro'yxati✅", type: [Order] })
  @ApiResponse({ status: 404, description: "Hech qanday order topilmadi❌" })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("USER", "ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Orderni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Topilgan order✅", type: Order })
  @ApiResponse({ status: 404, description: "Order topilmadi❌" })
  @ApiParam({ name: "id", type: Number, description: "Order ID" })
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard, SelfGuard)
  @Roles("USER", "ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Orderni yangilash" })
  @ApiResponse({ status: 200, description: "Order muvaffaqiyatli yangilandi✅", type: Order })
  @ApiResponse({ status: 404, description: "Order topilmadi❌" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi❌" })
  @ApiParam({ name: "id", type: Number, description: "Order ID" })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiOperation({ summary: "Orderni o'chirish" })
  @ApiResponse({ status: 200, description: "Order o'chirildi✅" })
  @ApiResponse({ status: 404, description: "Order topilmadi❌" })
  @ApiParam({ name: "id", type: Number, description: "Order ID" })
  remove(@Param("id") id: string) {
    return this.orderService.remove(+id);
  }
}