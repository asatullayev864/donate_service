import { PartialType } from '@nestjs/swagger';
import { CreateRecipientSocialDto } from './create-recipient-social.dto';

export class UpdateRecipientSocialDto extends PartialType(CreateRecipientSocialDto) {}
