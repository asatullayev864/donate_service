import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        example: "Ali Valiyev",
        description: "Adminning to'liq ismi"
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({
        example: "admin@example.com",
        description: "Adminning email manzili (unikal)"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "StrongPassword123!",
        description: "Adminning paroli (kamida 6 belgidan iborat bo'lishi kerak)"
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: true,
        description: "Admin yaratuvchimi yoki yo'qmi (asosiy admin bo'lsa true)",
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    is_creator?: boolean = false;

    @ApiProperty({
        example: true,
        description: "Admin faol yoki yo'qligi",
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean = true;
}