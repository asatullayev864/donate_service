import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsNotEmpty, IsOptional, Min, MaxLength, IsIn, IsEnum } from "class-validator";
import { OrderStatus } from "../../../enums/order-status.enum";

export class CreateOrderDto {
    @ApiProperty({
        description: "Xayriya amalga oshiriladigan joy (viloyat, tuman yoki aniq manzil)",
        maxLength: 255,
        example: "Toshkent shahri, Yunusobod tumani",
    })
    @IsString({ message: "Location matn ko'rinishida bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Location kiritilishi shart❗️" })
    @MaxLength(255, { message: "Location 255 ta belgidan oshmasligi kerak❗️" })
    location: string;

    @ApiProperty({
        description: "Xayriya qilayotgan foydalanuvchining ID raqami",
        example: 3,
    })
    @IsInt({ message: "userId butun son bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "userId kiritilishi shart❗️" })
    userId: number;

    @ApiProperty({
        description: "Xayriya yo'naltirilayotgan do'kon yoki tashkilot ID raqami",
        example: 1,
    })
    @IsInt({ message: "shopId butun son bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "shopId kiritilishi shart❗️" })
    shopId: number;

    @ApiProperty({
        description: "Buyurtma holati (default: pending)",
        example: "pending",
        required: false,
    })
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Status faqat quyidagilardan biri bo'lishi mumkin: ${Object.values(OrderStatus).join(", ")}❌`
    })
    status?: OrderStatus;

    @ApiProperty({
        description: "Xayriya miqdori (masalan: 5 dona mahsulot yoki 5 birlik yordam)",
        example: 5,
    })
    @IsInt({ message: "Quantity butun son bo'lishi kerak❗️" })
    @Min(1, { message: "Quantity kamida 1 bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Quantity kiritilishi shart❗️" })
    quantity: number;
}