import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Oziq-ovqat",
        description: "Kategoriya nomi (masalan: Oziq-ovqat, Kiyim-kechak, Dori-darmon, va hokazo)",
    })
    @IsNotEmpty({ message: "Kategoriya nomi bo'sh bo'lmasligi kerak❗️" })
    @IsString({ message: "Kategoriya nomi matn bo'lishi kerak❗️" })
    @MinLength(3, { message: "Kategoriya nomi kamida 3 ta belgidan iborat bo'lishi kerak❗️" })
    @MaxLength(50, { message: "Kategoriya nomi 50 ta belgidan oshmasligi kerak❗️" })
    name: string;
}