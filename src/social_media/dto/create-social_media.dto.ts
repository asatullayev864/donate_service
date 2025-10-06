import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class CreateSocialMediaDto {
    @ApiProperty({
        example: "Facebook",
        description: "Ijtimoiy tarmoq nomi (unikal bo'lishi kerak, masalan: Facebook, Instagram, Telegram)",
    })
    @IsNotEmpty({ message: "social_media kiritilishi shart❗️" })
    @IsString({ message: "social_media matn (string) bo'lishi kerak❗️" })
    @Length(2, 50, { message: "social_media uzunligi 2 dan 50 belgigacha bo'lishi kerak❗️" })
    social_media: string;

    @ApiProperty({
        example: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
        description: "Ijtimoiy tarmoq uchun ikonka URL manzili (to'liq http yoki https formatda)",
    })
    @IsNotEmpty({ message: "iconic_url kiritilishi shart❗️" })
    @IsString({ message: "iconic_url matn (string) bo'lishi kerak❗️" })
    @IsUrl({}, { message: "iconic_url noto'g'ri URL formatda kiritilgan❌ (masalan: https://...)" })
    iconic_url: string;
}