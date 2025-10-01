import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Admin } from '../admin/models/admin.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.SECRET_TIME }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
