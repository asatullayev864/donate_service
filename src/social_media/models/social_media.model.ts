import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

interface ISocialMediaAttr {
    social_media: string;
    iconic_url: string;
}

@Table({ tableName: "social_media" })
export class SocialMedia extends Model<SocialMedia, ISocialMediaAttr> {
    @ApiProperty({ example: 1, description: "Unikal ID" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Facebook",
        description: "Ijtimoiy tarmoq nomi"
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    declare social_media: string;

    @ApiProperty({
        example: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
        description: "Ijtimoiy tarmoq uchun ikonka URL manzili",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare iconic_url: string;

    @HasMany(() => RecipientSocial)
    recipient_social: RecipientSocial[];
}