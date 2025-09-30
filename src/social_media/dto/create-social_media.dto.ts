import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class CreateSocialMediaDto {
    @ApiProperty({
        example: "Facebook",
        description: "Ijtimoiy tarmoq nomi (unikal bo'lishi kerak)",
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    social_media: string;

    @ApiProperty({
        example: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
        description: "Ijtimoiy tarmoq uchun ikonka URL manzili",
    })
    @IsString()
    @IsUrl({}, { message: "iconic_url noto'g'ri URL formatda bo'lishi kerak" })
    @IsNotEmpty()
    iconic_url: string;
}