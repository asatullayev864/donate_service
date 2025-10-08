import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentStatus } from "../../enums/payment.enum";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { userId, donateId, orderId, payment_method, amount } = createPaymentDto;

    if (!userId || !donateId || !orderId || !payment_method || !amount) {
      throw new BadRequestException("Iltimos, barcha maydonlarni to'ldiring❗️");
    }

    const payment = await this.paymentModel.create({
      ...createPaymentDto,
      status: createPaymentDto.status ?? PaymentStatus.PENDING,
      payment_date: createPaymentDto.payment_date ?? new Date(),
    });

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, { include: { all: true } });
    if (!payment) {
      throw new NotFoundException(`ID raqami ${id} bo'lgan to'lov topilmadi❌`);
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    await payment.update(updatePaymentDto);
    return payment;
  }

  async remove(id: number): Promise<object> {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: `ID raqami ${id} bo'lgan to'lov o'chirildi✅` };
  }
}