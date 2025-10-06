import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsOptional,
    IsIn,
    IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipientDto {
    @ApiProperty({
        description: "Recipientning qisqa nomi (login yoki nickname sifatida)",
        maxLength: 50,
        example: "jurabek01",
    })
    @IsString({ message: "Name matn ko'rinishida bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Name kiritilishi shart❗️" })
    @MaxLength(50, { message: "Name 50 ta belgidan oshmasligi kerak❗️" })
    name: string;

    @ApiProperty({
        description: "Recipientning to'liq ismi",
        maxLength: 50,
        example: "Jo'rabek Xolmatov",
    })
    @IsString({ message: "Full name matn bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Full name kiritilishi shart❗️" })
    @MaxLength(50, { message: "Full name 50 ta belgidan oshmasligi kerak❗️" })
    full_name: string;

    @ApiProperty({
        description: "Recipient email manzili (unikal bo'lishi kerak)",
        maxLength: 50,
        example: "jorabek@example.com",
    })
    @IsEmail({}, { message: "Email noto'g'ri formatda❌" })
    @IsNotEmpty({ message: "Email kiritilishi shart❗️" })
    @MaxLength(50, { message: "Email 50 ta belgidan oshmasligi kerak❗️" })
    email: string;

    @ApiProperty({
        description: "Parol (kamida 6 belgidan iborat bo'lishi kerak)",
        minLength: 6,
        example: "mypassword123",
    })
    @IsString({ message: "Password matn bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Password kiritilishi shart❗️" })
    @MinLength(6, { message: "Password kamida 6 belgidan iborat bo'lishi kerak❗️" })
    password: string;

    @ApiProperty({
        description: "Recipient manzili (to'liq joylashuv)",
        maxLength: 255,
        example: "Toshkent, Amir Temur ko'chasi, 12",
    })
    @IsString({ message: "Address matn bo'lishi kerak❗️" })
    @IsNotEmpty({ message: "Address kiritilishi shart❗️" })
    @MaxLength(255, { message: "Address 255 ta belgidan oshmasligi kerak❗️" })
    address: string;

    @ApiProperty({
        description: "Foydalanuvchi roli (default: RECIPIENT)",
        example: "RECIPIENT",
        required: false,
    })
    @IsOptional()
    @IsIn(["RECIPIENT"], { message: "Role faqat RECIPIENT bo'lishi mumkin❌" })
    role?: string;
}