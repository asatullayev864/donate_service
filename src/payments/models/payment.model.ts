import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Donate } from "../../donate/models/donate.model";
import { Order } from "../../order/models/order.model";
import { PaymentMethod, PaymentStatus } from "../../../enums/payment.enum";

interface IPaymentAttr {
    userId: number;
    donateId: number;
    orderId: number;
    payment_method: PaymentMethod;
    status: PaymentStatus;
    amount: number;
    payment_date?: Date;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, IPaymentAttr> {
    @ApiProperty({ example: 1, description: "To'lovning unikal ID raqami" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: 3, description: "Foydalanuvchi ID raqami" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @ApiProperty({ example: 2, description: "Donat ID raqami" })
    @ForeignKey(() => Donate)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare donateId: number;

    @ApiProperty({ example: 5, description: "Order (buyurtma) ID raqami" })
    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare orderId: number;

    @ApiProperty({ example: PaymentMethod.CARD, enum: PaymentMethod, description: "To'lov turi" })
    @Column({
        type: DataType.ENUM(...Object.values(PaymentMethod)),
        allowNull: false,
    })
    declare payment_method: PaymentMethod;

    @ApiProperty({ example: PaymentStatus.PENDING, enum: PaymentStatus, description: "To'lov holati" })
    @Column({
        type: DataType.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
        defaultValue: PaymentStatus.PENDING,
    })
    declare status: PaymentStatus;

    @ApiProperty({ example: 50000, description: "To'lov summasi (so'mda)" })
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare amount: number;

    @ApiProperty({ example: "2025-10-08T09:00:00Z", description: "To'lov sanasi" })
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    declare payment_date: Date;
}