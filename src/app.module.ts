import { Module } from '@nestjs/common';
import { RecipientModule } from './recipient/recipient.module';

@Module({
  imports: [RecipientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
