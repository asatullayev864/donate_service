import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipientDto } from './create-recipient.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecipientDto extends PartialType(CreateRecipientDto) {
    // @ApiPropertyOptional({
    //     description: "Current password (needed to set a new password)",
    //     example: "oldpassword123"
    // })
    @IsOptional()
    @IsString()
    currentPassword?: string;

    // @ApiPropertyOptional({
    //     description: "New password (at least 6 characters)",
    //     example: "newpassword123"
    // })
    @IsOptional()
    @IsString()
    @MinLength(6)
    new_password?: string;
}