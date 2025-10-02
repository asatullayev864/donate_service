import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminAttr {
    full_name: string;
    email: string;
    password: string;
    is_creator?: boolean;
    is_active?: boolean;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminAttr> {
    @ApiProperty({
        example: 1,
        description: "Unikal Admin ID (primary key)"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Ali Valiyev",
        description: "Adminning to'liq ismi"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare full_name: string;

    @ApiProperty({
        example: "admin@example.com",
        description: "Adminning email manzili (unikal)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @ApiProperty({
        example: "hashed_password_123",
        description: "Adminning paroli (hashed holda saqlanadi)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @ApiProperty({
        example: true,
        description: "Admin yaratgan asosiy foydalanuvchi yoki yo'qligini bildiradi"
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    declare is_creator: boolean;

    @ApiProperty({
        example: true,
        description: "Admin faol yoki bloklanganligini bildiradi"
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare is_active: boolean;

    @ApiProperty({
        example: "superadmin",
        description: "Adminning roli (masalan: superadmin, admin)"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "ADMIN",
    })
    declare role: string;
}