import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsDateString,
    Length
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty({
        example: "Humo",
        description: "Karta turi (Visa, MasterCard, Humo, UzCard)"
    })
    @IsNotEmpty({ message: "card_type bo'sh bo'lmasligi kerak" })
    @IsString({ message: "card_type matn bo'lishi kerak" })
    card_type: string;

    @ApiProperty({
        example: "8600123412341234",
        description: "Unikal karta raqami (16 ta raqamdan iborat)"
    })
    @IsNotEmpty({ message: "card_number bo'sh bo'lmasligi kerak" })
    @IsString({ message: "card_number matn bo'lishi kerak" })
    @Length(16, 16, { message: "card_number 16 ta belgidan iborat bo'lishi kerak" })
    card_number: string;

    @ApiProperty({
        example: "2026-12-31",
        description: "Karta amal qilish muddati (YYYY-MM-DD formatida)"
    })
    @IsNotEmpty({ message: "expiry_date bo'sh bo'lmasligi kerak" })
    @IsDateString({}, { message: "expiry_date to'g'ri sana formatida (YYYY-MM-DD) bo'lishi kerak" })
    expiry_date: Date;

    @ApiProperty({
        example: 1,
        description: "Karta egasining (recipient) ID raqami"
    })
    @IsNotEmpty({ message: "recipientId bo'sh bo'lmasligi kerak" })
    @IsInt({ message: "recipientId butun son bo'lishi kerak" })
    recipientId: number;
}