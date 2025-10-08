import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { PaymentMethod, PaymentStatus } from "../../../enums/payment.enum";

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: "To'lov qilayotgan foydalanuvchi ID raqami" })
    @IsNumber({}, { message: "userId raqamsal bo'lishi kerak" })
    userId: number;

    @ApiProperty({ example: 2, description: "Donat ID raqami" })
    @IsNumber({}, { message: "donateId raqamsal bo'lishi kerak" })
    donateId: number;

    @ApiProperty({ example: 3, description: "Order (buyurtma) ID raqami" })
    @IsNumber({}, { message: "orderId raqamsal bo'lishi kerak" })
    orderId: number;

    @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CARD, description: "To'lov usuli" })
    @IsEnum(PaymentMethod, { message: "To'lov usuli noto'g'ri (CARD, CASH, PAYME yoki CLICK bo'lishi kerak)" })
    payment_method: PaymentMethod;

    @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING, description: "To'lov holati (optional)" })
    @IsEnum(PaymentStatus, { message: "Status noto'g'ri (PENDING, SUCCESS yoki FAILED bo'lishi kerak)" })
    @IsOptional()
    status?: PaymentStatus;

    @ApiProperty({ example: 50000, description: "To'lov summasi (so'mda)" })
    @IsNumber({}, { message: "amount raqamsal bo'lishi kerak" })
    @IsPositive({ message: "amount musbat bo'lishi kerak" })
    amount: number;

    @ApiProperty({ example: "2025-10-08T09:00:00Z", description: "To'lov sanasi (optional)" })
    @IsOptional()
    payment_date?: Date;
}