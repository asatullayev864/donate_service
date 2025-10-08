import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  @ApiOperation({ summary: "Yangi admin ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli ro'yxatdan o'tdi va token qaytdi",
    schema: {
      example: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  signup(@Body() createdAdminDto: CreateAdminDto) {
    return this.authService.signup(createdAdminDto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Admin tizimga kirishi (login)" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimga kirdi va token qaytdi",
    schema: {
      example: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: "Email yoki parol noto'g'ri"
  })
  signin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signinAdminDto, res);
  }
}