import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { User } from "../../user/models/user.model";

interface IDonateAttr {
    recipientId: number;
    userId: number;
    notification?: string;
    is_AnonimPay?: boolean;
}

@Table({ tableName: "donate" })
export class Donate extends Model<Donate, IDonateAttr> {
    @ApiProperty({ example: 1, description: "Unikal donate ID raqami" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 2, description: "Xayriyani oluvchi recipient ID raqami" })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @ApiProperty({ example: 5, description: "Xayriya qilgan foydalanuvchi (donor) ID raqami" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @ApiProperty({ example: "Alloh rozi bo'lsin 🙏", description: "Xayriya haqida izoh yoki xabar" })
    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    declare notification: string;

    @ApiProperty({ example: false, description: "Xayriya anonim tarzda qilinganmi (true/false)" })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    declare is_AnonimPay: boolean;

    @BelongsTo(() => Recipient)
    recipient: Recipient;

    @BelongsTo(() => User)
    user: User;
}