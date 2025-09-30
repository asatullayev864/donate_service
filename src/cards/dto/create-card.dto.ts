import { IsNotEmpty, IsString, IsInt, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty({ example: "Humo", description: "Card type (Visa, MasterCard, Humo, UzCard)" })
    @IsNotEmpty()
    @IsString()
    card_type: string;

    @ApiProperty({ example: "8600123412341234", description: "Unique card number" })
    @IsNotEmpty()
    @IsString()
    card_number: string;

    @ApiProperty({ example: "2026-12-31", description: "Card expiry date (YYYY-MM-DD)" })
    @IsNotEmpty()
    @IsDateString()
    expiry_date: Date;

    @ApiProperty({ example: 1, description: "Recipient ID (owner of the card)" })
    @IsNotEmpty()
    @IsInt()
    recipientId: number;
}