import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IRecipientAttr {
    name: string;
    full_name: string;
    email: string;
    password: string;
    address: string;
}

@Table({ tableName: "recipient" })
export class Recipient extends Model<Recipient, IRecipientAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    declare name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare full_name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare address: string;
}