import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Shop } from "../../shop/models/shop.model";
import { OrderStatus } from "../../../enums/order-status.enum";

interface IOrderAttr {
    location: string;
    userId: number;
    shopId: number;
    status: OrderStatus;
    quantity: number;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, IOrderAttr> {
    @ApiProperty({ example: 1, description: "Buyurtmaning unikal ID raqami" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ example: "Toshkent, Chilonzor 9", description: "Xayriya amalga oshiriladigan joy (manzil yoki hudud)" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare location: string;

    @ApiProperty({ example: 2, description: "Buyurtmani bergan foydalanuvchi ID raqami" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare userId: number;

    @ApiProperty({ example: 1, description: "Buyurtma qilingan do'kon ID raqami" })
    @ForeignKey(() => Shop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare shopId: number;

    @ApiProperty({ example: "pending", description: "Buyurtma holati (pending, delivered, canceled, va hokazo)" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: OrderStatus.PENDING,
    })
    declare status: OrderStatus;

    @ApiProperty({ example: 3, description: "Buyurtma miqdori (nechta mahsulot)" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantity: number;
}