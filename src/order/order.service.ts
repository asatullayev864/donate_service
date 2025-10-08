import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '../../enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { location, userId, shopId, quantity } = createOrderDto;
    if (!location || !userId || !shopId || !quantity) {
      throw new BadRequestException("Iltimos barcha malumotlarni kiriting!");
    }
    const order = await this.orderModel.create({
      ...createOrderDto,
      status: createOrderDto.status ?? OrderStatus.PENDING,
    });
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, { include: { all: true } });
    if (!order) {
      throw new NotFoundException(`ID raqami ${id} bo'lgan order topilmadi❌`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException("Bunday ID da order topilmadi!");
    }
    const updatedOrder = await this.orderModel.update(
      updateOrderDto,
      { where: { id } }
    );
    return updatedOrder;
  }

  async remove(id: number): Promise<object> {
    const order = await this.findOne(id);
    await order.destroy();
    return { message: `ID raqami ${id} bo'lgan order muvaffaqiyatli o'chirildi✅` };
  }
}