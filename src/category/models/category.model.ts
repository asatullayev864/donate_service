import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategoryAttr {
    name: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, ICategoryAttr> {
    @ApiProperty({
        example: 1,
        description: "Unikal kategoriya ID (primary key)"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Oziq-ovqat",
        description: "Kategoriya nomi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare name: string;
}