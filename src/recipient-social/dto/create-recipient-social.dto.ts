import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateRecipientSocialDto {
    @ApiProperty({
        example: 3,
        description: "Recipient ID (foreign key)",
    })
    @IsNotEmpty()
    @IsInt()
    recipientId: number;

    @ApiProperty({
        example: 2,
        description: "SocialMedia ID (foreign key)",
    })
    @IsNotEmpty()
    @IsInt()
    socialId: number;

    @ApiProperty({
        example: "https://facebook.com/john.doe",
        description: "Recipientning ijtimoiy tarmoqdagi profili URL manzili",
    })
    @IsNotEmpty()
    @IsString()
    @IsUrl({}, { message: "Iltimos, to'g'ri URL manzil kiriting" })
    social_url: string;
}