import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    oldPassword?: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword?: string;
}
