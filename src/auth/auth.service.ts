import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/models/admin.model';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin) private adminRepo: typeof Admin,
        private readonly jwtService: JwtService,
    ) { }

    private async generateTokens(admin: Admin) {
        const payload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.sign(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);

        return {
            accessToken, refreshToken
        };
    }

    async signup(createAdminDto: CreateAdminDto) {
        const { email, password, role, ...rest } = createAdminDto;
        const normalizedRole = role ? role.toUpperCase() : "SUPERADMIN";
        if (role !== "SUPERADMIN") {
            throw new BadRequestException("Noto'g'ri rol. Faqat SUPERADMIN bo'lishi mumkin.");
        }
        const existsSuperAdmin = await this.adminRepo.findOne({ where: { role } });
        if (existsSuperAdmin && existsSuperAdmin.role === "SUPERADMIN") {
            throw new BadRequestException("Super admin faqat bitta bolishi mumkin");
        }

        const existsEmail = await this.adminRepo.findOne({ where: { email } });
        if (existsEmail) {
            throw new ConflictException('Bunday admin mavjud');
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const newAdmin = await this.adminRepo.create({
            password: hashedPassword,
            email,
            role: normalizedRole,
            ...rest
        });
        console.log("Authga kirdi");


        return {
            message: "Success",
            admin: { "id": newAdmin.id, "email": newAdmin.email }
        }
    }

    async signin(signinAdminDto: SigninAdminDto, res: Response) {

        const { email, password } = signinAdminDto;
        
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
            throw new UnauthorizedException("Email noto'g'ri");
        }

        const verifyPassword = await bcrypt.compare(password, admin.password);
        if (!verifyPassword) {
            throw new UnauthorizedException("Password noto'g'ri");
        }

        const { accessToken, refreshToken } = await this.generateTokens(admin);

        const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
        admin.refresh_token = hashedRefreshToken;
        await admin.save();

        res.cookie("refreshToken", refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true
        });

        return {
            message: "User logged in",
            id: admin.id,
            accessToken,
        };
    }

    // async signout(refreshToken: string, res: Response) {
    //     const userData = await this.jwtService.verify(refreshToken, {
    //         secret: process.env.
    //     })
    // }
}