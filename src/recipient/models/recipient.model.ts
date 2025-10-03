import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "../../cards/models/card.model";
import { ApiProperty } from "@nestjs/swagger";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

interface IRecipientAttr {
    name: string;
    full_name: string;
    email: string;
    password: string;
    address: string;
    role?: string; // role optional
}

@Table({ tableName: "recipient" })
export class Recipient extends Model<Recipient, IRecipientAttr> {
    @ApiProperty({ example: 1, description: "Unikal ID (primary key)" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: "jurabek01", description: "Foydalanuvchi login nomi" })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    declare name: string;

    @ApiProperty({ example: "Jo'rabek Abdullayev", description: "Foydalanuvchining to'liq ismi" })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare full_name: string;

    @ApiProperty({ example: "jurabek@mail.com", description: "Foydalanuvchi email manzili" })
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @ApiProperty({ example: "P@ssw0rd123", description: "Foydalanuvchi paroli (hashed saqlanadi)" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @ApiProperty({ example: "Toshkent, Yunusobod", description: "Foydalanuvchining manzili" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare address: string;

    @ApiProperty({ example: "recipient", description: "Foydalanuvchi roli" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "RECIPIENT",
    })
    declare role: string;

    @ApiProperty({ type: () => [Card], description: "Foydalanuvchiga tegishli kartalar ro'yxati" })
    @HasMany(() => Card)
    cards: Card[];

    @HasMany(() => RecipientSocial)
    recipient_social: RecipientSocial[];
}