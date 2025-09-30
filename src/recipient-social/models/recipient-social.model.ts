import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Recipient } from "../../recipient/models/recipient.model";
import { SocialMedia } from "../../social_media/models/social_media.model";


interface IRecipientSocialAttr {
    socialId: number;
    recipientId: number;
    social_url: string;
}

@Table({ tableName: "recipient_social" })
export class RecipientSocial extends Model<RecipientSocial, IRecipientSocialAttr> {
    @ApiProperty({ example: 1, description: "Unikal ID" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;



    @ApiProperty({
        example: "https://facebook.com/john.doe",
        description: "Recipientning ijtimoiy tarmoqdagi profili URL manzili",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare social_url: string;



    @ApiProperty({
        example: 2,
        description: "SocialMedia ID (foreign key)"
    })
    @ForeignKey(() => SocialMedia)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare socialId: number;

    @BelongsTo(() => SocialMedia)
    socialMedia: SocialMedia;



    @ApiProperty({
        example: 3,
        description: "Recipient ID (foreign key)"
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @BelongsTo(() => Recipient)
    recipient: Recipient;
}