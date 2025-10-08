import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UsersRole } from "../../../enums/roles.enum";

interface IUserAttr {
    full_name: string;
    email: string;
    password: string;
    card_number?: string;
    is_active?: boolean;
    role?: UsersRole;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserAttr> {
    @ApiProperty({ example: 1, description: "Foydalanuvchining unikal ID raqami" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({
        example: "Jo'rabek Tursunov",
        description: "Foydalanuvchining to'liq ismi",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare full_name: string;

    @ApiProperty({
        example: "jorabek@mail.com",
        description: "Foydalanuvchining elektron pochtasi (unikal)",
    })
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @ApiProperty({
        example: "hashed_password_123",
        description: "Foydalanuvchining hashlangan paroli",
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @ApiProperty({
        example: "8600 1234 5678 9012",
        description: "Foydalanuvchining karta raqami",
    })
    @Column({
        type: DataType.STRING(30),
        allowNull: true,
        defaultValue: "",
    })
    declare card_number?: string;

    @ApiProperty({
        example: true,
        description: "Foydalanuvchi aktiv yoki yo'qligini bildiradi",
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    declare is_active: boolean;

    @Column({
        type: DataType.STRING,
        defaultValue: UsersRole.USER
    })
    declare role?: string;
}