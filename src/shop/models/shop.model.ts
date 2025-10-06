import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { Category } from "../../category/models/category.model";

interface IShopAttr {
    name: string;
    count: number;
    price: number;
    title: string;
    description?: string | null;
    recipientId: number;
    categoryId: number;
}

@Table({ tableName: "shop" })
export class Shop extends Model<Shop, IShopAttr> {
    @ApiProperty({
        example: 1,
        description: "Unikal do'kon (shop) ID (primary key)"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Non mahsulotlari",
        description: "Do'kon nomi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @ApiProperty({
        example: 50,
        description: "Mahsulotlar soni (count)"
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare count: number;

    @ApiProperty({
        example: 12000,
        description: "Mahsulot narxi (so'mda)"
    })
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare price: number;

    @ApiProperty({
        example: "Mahalliy pishiriqlar",
        description: "Mahsulot yoki bo'lim sarlavhasi (title)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @ApiProperty({
        example: "Non, kulcha, somsa va boshqa mahalliy pishiriqlar.",
        description: "Kategoriya yoki mahsulot tavsifi (description)"
    })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description?: string | null;

    @ApiProperty({ 
        example: 3,
        description: "Do'kon egasining (recipient) ID raqami"
    })
    @ForeignKey(() => Recipient)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare recipientId: number;

    @ApiProperty({
        example: 2,
        description: "Do'konning kategoriyasi ID raqami"
    })
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare categoryId: number;

    @ApiProperty({
        type: () => Recipient,
        description: "Do'kon egasining ma'lumotlari"
    })
    @BelongsTo(() => Recipient)
    recipient: Recipient;

    @ApiProperty({
        type: () => Category,
        description: "Do'kon kategoriyasi haqida ma'lumot"
    })
    @BelongsTo(() => Category)
    category: Category;
}