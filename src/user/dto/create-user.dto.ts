import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { UsersRole } from "../../../enums/roles.enum";

export class CreateUserDto {
    @ApiProperty({
        example: "Jo'rabek Tursunov",
        description: "Foydalanuvchining to'liq ismi (kamida 3 ta belgi bo'lishi kerak)",
    })
    @IsNotEmpty({ message: "full_name kiritilishi shart❗️" })
    @IsString({ message: "full_name matn (string) bo'lishi kerak❗️" })
    @Length(3, 100, { message: "full_name uzunligi 3 dan 100 belgigacha bo'lishi kerak❗️" })
    full_name: string;

    @ApiProperty({
        example: "jorabek@mail.com",
        description: "Foydalanuvchining elektron pochtasi (unikal bo'lishi kerak)",
    })
    @IsNotEmpty({ message: "email kiritilishi shart❗️" })
    @IsEmail({}, { message: "email noto'g'ri formatda kiritilgan❌ (masalan: user@gmail.com)" })
    email: string;

    @ApiProperty({
        example: "StrongPass123",
        description: "Foydalanuvchining paroli (kamida 6 ta belgi bo'lishi kerak)",
    })
    @IsNotEmpty({ message: "password kiritilishi shart❗️" })
    @IsString({ message: "password matn (string) bo'lishi kerak❗️" })
    @Length(6, 50, { message: "password uzunligi 6 dan 50 belgigacha bo'lishi kerak❗️" })
    password: string;

    @ApiProperty({
        example: "8600 1234 5678 9012",
        description: "Foydalanuvchining karta raqami (ixtiyoriy maydon)",
    })
    @IsOptional()
    @IsString({ message: "card_number matn (string) bo'lishi kerak❗️" })
    @Length(8, 30, { message: "card_number uzunligi 8 dan 30 belgigacha bo'lishi kerak❗️" })
    card_number?: string;

    @ApiProperty({
        example: true,
        description: "Foydalanuvchi aktiv yoki yo'qligini bildiradi (default: true)",
        default: true
    })
    @IsOptional()
    @IsBoolean({ message: "is_active qiymati boolean (true/false) bo'lishi kerak❗️" })
    is_active?: boolean = true;

    @IsOptional()
    @IsEnum(UsersRole, {
        message: `Status faqat quyidagilardan biri bo'lishi mumkin: ${Object.values(UsersRole).join(", ")}❌`
    })
    role?: UsersRole;
}