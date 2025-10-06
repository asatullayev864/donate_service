import {
    ApiProperty
} from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength
} from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        example: "Ali Valiyev",
        description: "Adminning to'liq ismi"
    })
    @IsString({ message: "full_name matn bo'lishi kerak" })
    @IsNotEmpty({ message: "full_name bo'sh bo'lmasligi kerak" })
    full_name: string;

    @ApiProperty({
        example: "admin@example.com",
        description: "Adminning email manzili (unikal)"
    })
    @IsEmail({}, { message: "Email noto'g'ri formatda kiritilgan" })
    @IsNotEmpty({ message: "email bo'sh bo'lmasligi kerak" })
    email: string;

    @ApiProperty({
        example: "StrongPassword123!",
        description: "Adminning paroli (kamida 6 belgidan iborat bo'lishi kerak)"
    })
    @IsString({ message: "password matn bo'lishi kerak" })
    @MinLength(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" })
    @IsNotEmpty({ message: "password bo'sh bo'lmasligi kerak" })
    password: string;

    @ApiProperty({
        example: true,
        description: "Admin yaratuvchimi yoki yo'qmi (asosiy admin bo'lsa true)",
        default: false,
    })
    @IsBoolean({ message: "is_creator qiymati boolean (true/false) bo'lishi kerak" })
    @IsOptional()
    is_creator?: boolean = false;

    @ApiProperty({
        example: true,
        description: "Admin faol yoki yo'qligi",
        default: true,
    })
    @IsBoolean({ message: "is_active qiymati boolean (true/false) bo'lishi kerak" })
    @IsOptional()
    is_active?: boolean = true;

    @ApiProperty({
        example: "SUPERADMIN",
        description: "Adminning roli (faqat ADMIN yoki SUPERADMIN bo'lishi mumkin)",
        default: "ADMIN",
    })
    @IsString({ message: "role matn bo'lishi kerak" })
    @IsIn(["ADMIN", "SUPERADMIN"], {
        message: "role faqat 'ADMIN' yoki 'SUPERADMIN' bo'lishi mumkin",
    })
    @IsOptional()
    role?: string = "ADMIN";
}