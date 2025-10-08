import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateDonateDto {
    @ApiProperty({
        description: "Xayriyani oluvchi recipient ID raqami",
        example: 2,
    })
    @IsInt({ message: "Recipient ID butun son bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Recipient ID kiritilishi shart❗️" })
    recipientId: number;

    @ApiProperty({
        description: "Xayriya qilgan foydalanuvchi (donor) ID raqami",
        example: 5,
    })
    @IsInt({ message: "User ID butun son bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "User ID kiritilishi shart❗️" })
    userId: number;

    @ApiProperty({
        description: "Xayriya haqida izoh yoki xabar (ixtiyoriy)",
        maxLength: 255,
        required: false,
        example: "Alloh rozi bo'lsin 🙏",
    })
    @IsOptional()
    @IsString({ message: "Notification matn ko'rinishida bo'lishi kerak❗️" })
    @MaxLength(255, { message: "Notification 255 belgidan oshmasligi kerak❗️" })
    notification?: string;

    @ApiProperty({
        description: "Xayriya anonim tarzda qilinganmi (true/false)",
        example: false,
        default: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: "is_AnonimPay qiymati faqat true yoki false bo'lishi kerak❗️" })
    is_AnonimPay?: boolean;
}