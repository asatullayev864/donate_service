import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninAdminDto {
    @ApiProperty({
        example: 'superadmin@example.com',
        description: "Adminning email manzili",
        required: true,
    })
    @IsEmail({}, { message: "Email noto'g'ri kiritilgan" })
    email: string;

    @ApiProperty({
        example: 'SuperSecret123!',
        description: "Adminning paroli (kamida 6 ta belgidan iborat)",
        required: true,
        minLength: 6,
    })
    @IsString()
    @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
    password: string;
}