import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class CreateRecipientDto {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    full_name: string;

    @IsEmail({}, { message: "Email noto'g'ri formatda" })
    @MaxLength(50)
    email: string;

    @IsString()
    @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" })
    password: string;

    @IsString()
    @MaxLength(255)
    address: string;
}