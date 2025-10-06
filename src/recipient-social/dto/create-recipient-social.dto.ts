import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateRecipientSocialDto {
    @ApiProperty({
        example: 3,
        description: "Recipient ID (foreign key)",
    })
    @IsNotEmpty({ message: "recipientId kiritilishi shart❗️" })
    @IsInt({ message: "recipientId butun son (integer) bo'lishi kerak❗️" })
    recipientId: number;

    @ApiProperty({
        example: 2,
        description: "SocialMedia ID (foreign key)",
    })
    @IsNotEmpty({ message: "socialId kiritilishi shart❗️" })
    @IsInt({ message: "socialId butun son (integer) bo'lishi kerak❗️" })
    socialId: number;

    @ApiProperty({
        example: "https://facebook.com/john.doe",
        description: "Recipientning ijtimoiy tarmoqdagi profili URL manzili",
    })
    @IsNotEmpty({ message: "social_url kiritilishi shart❗️" })
    @IsString({ message: "social_url matn (string) bo'lishi kerak❗️" })
    @IsUrl({}, { message: "social_url noto'g'ri formatda, to'g'ri URL kiriting❌" })
    social_url: string;
}