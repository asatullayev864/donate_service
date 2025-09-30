import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICardAttr {
    card_type: string;
    card_number: string;
    expiry_date: Date;
    recipientId: number;
}

@Table({ tableName: "cards" })
export class Card extends Model<Card, ICardAttr> {
    @ApiProperty({
        example: 1,
        description: "Unikal karta ID (primary key)"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Visa",
        description: "Karta turi (Visa, MasterCard, HUMO, UzCard ...)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare card_type: string;

    @ApiProperty({
        example: "8600123456789012",
        description: "Karta raqami (unikal)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare card_number: string;

    @ApiProperty({
        example: "2027-09-30",
        description: "Karta amal qilish muddati (YYYY-MM-DD)"
    })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare expiry_date: Date;

    @ApiProperty({
        example: 3,
        description: "Karta egalining (recipient) ID raqami"
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @ApiProperty({
        type: () => Recipient,
        description: "Karta egasining ma'lumotlari"
    })
    @BelongsTo(() => Recipient)
    recipient: Recipient;
}