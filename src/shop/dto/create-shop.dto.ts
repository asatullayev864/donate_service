import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsNumber, IsOptional, Min, MinLength } from "class-validator";

export class CreateShopDto {
    @ApiProperty({
        example: "Non mahsulotlari",
        description: "Do'kon nomi (masalan: Non mahsulotlari, Ichimliklar, Shirinliklar va h.k.)",
    })
    @IsNotEmpty({ message: "name kiritilishi shart❗️" })
    @IsString({ message: "name matn (string) bo'lishi kerak❗️" })
    @MinLength(2, { message: "name kamida 2 ta belgidan iborat bo'lishi kerak❗️" })
    name: string;

    @ApiProperty({
        example: 50,
        description: "Mahsulotlar soni (count)",
    })
    @IsNotEmpty({ message: "count kiritilishi shart❗️" })
    @IsInt({ message: "count butun son (integer) bo'lishi kerak❗️" })
    @Min(1, { message: "count kamida 1 bo'lishi kerak❗️" })
    count: number;

    @ApiProperty({
        example: 12000,
        description: "Mahsulot narxi (so'mda)",
    })
    @IsNotEmpty({ message: "price kiritilishi shart❗️" })
    @IsNumber({}, { message: "price raqam (number) bo'lishi kerak❗️" })
    @Min(0, { message: "price manfiy bo'lishi mumkin emas❗️" })
    price: number;

    @ApiProperty({
        example: "Mahalliy pishiriqlar",
        description: "Mahsulot yoki bo'lim sarlavhasi (title)",
    })
    @IsNotEmpty({ message: "title kiritilishi shart❗️" })
    @IsString({ message: "title matn (string) bo'lishi kerak❗️" })
    @MinLength(2, { message: "title kamida 2 ta belgidan iborat bo'lishi kerak❗️" })
    title: string;

    @ApiProperty({
        example: "Non, kulcha, somsa va boshqa mahalliy pishiriqlar.",
        description: "Do'kon yoki mahsulot tavsifi (ixtiyoriy)",
        required: false,
    })
    @IsOptional()
    @IsString({ message: "description matn (string) bo'lishi kerak❗️" })
    description?: string | null;

    @ApiProperty({
        example: 3,
        description: "Do'kon egasining (recipient) ID raqami",
    })
    @IsNotEmpty({ message: "recipientId kiritilishi shart❗️" })
    @IsInt({ message: "recipientId butun son (integer) bo'lishi kerak❗️" })
    recipientId: number;

    @ApiProperty({
        example: 2,
        description: "Do'konning kategoriyasi ID raqami",
    })
    @IsNotEmpty({ message: "categoryId kiritilishi shart❗️" })
    @IsInt({ message: "categoryId butun son (integer) bo'lishi kerak❗️" })
    categoryId: number;
}