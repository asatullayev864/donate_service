import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/models/admin.model';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin) private adminRepo: typeof Admin,
        private readonly jwtService: JwtService,
    ) { }

    private async generateToken(admin: Admin) {
        const payload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        };

        return {
            token: this.jwtService.sign(payload)
        };
    }

    async signup(createAdminDto: CreateAdminDto) {
        const { email, password, role, ...rest } = createAdminDto;
        const normalizedRole = role ? role.toUpperCase() : "ADMIN";
        if (role !== "SUPERADMIN" && role !== "ADMIN") {
            throw new Error("Noto'g'ri rol. Faqat SUPERADMIN yoki ADMIN bo'lishi mumkin.");
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

        return {
            message: "Success",
            admin: { "id": newAdmin.id, "email": newAdmin.email }
        }
    }

    async signin(signinAdminDto: SigninAdminDto) {

        const { email, password } = signinAdminDto;

        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
            throw new UnauthorizedException("Email noto'g'ri");
        }

        const verifyPassword = await bcrypt.compare(password, admin.password);
        if (!verifyPassword) {
            throw new UnauthorizedException("Password noto'g'ri");
        }

        return this.generateToken(admin);
    }
}