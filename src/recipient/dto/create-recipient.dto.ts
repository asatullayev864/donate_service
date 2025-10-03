import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipientDto {
    @ApiProperty({
        description: "Recipientning qisqa nomi",
        maxLength: 50,
        example: "Jo'rabek"
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: "Recipientning to'liq ismi",
        maxLength: 50,
        example: "Jo'rabek Xolmatov"
    })
    @IsString()
    @MaxLength(50)
    full_name: string;

    @ApiProperty({
        description: "Recipient email manzili",
        maxLength: 50,
        example: "jorabek@example.com"
    })
    @IsEmail({}, { message: "Email noto'g'ri formatda" })
    @MaxLength(50)
    email: string;

    @ApiProperty({
        description: "Parol (kamida 6 belgidan iborat bo'lishi kerak)",
        minLength: 6,
        example: "mypassword123"
    })
    @IsString()
    @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" })
    password: string;

    @ApiProperty({
        description: "Manzil",
        maxLength: 255,
        example: "Toshkent, Amir Temur ko'chasi, 12"
    })
    @IsString()
    @MaxLength(255)
    address: string;

    @ApiProperty({
        description: "Foydalanuvchi roli",
        example: "RECIPIENT",
        required: false
    })
    @IsOptional()
    @IsIn(
        ["RECIPIENT"],
        { message: "Role faqat RECIPIENT bo'lishi mumkin" }
    )
    role?: string;
}