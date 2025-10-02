import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const exist = await this.adminModel.findOne({ where: { email: createAdminDto.email } });
    if (exist) {
      throw new BadRequestException('Bunday email bilan admin allaqachon mavjud');
    }

    const { role } = createAdminDto;
    if (role) {
      if (role === "SUPERADMIN") {
        throw new BadRequestException("Iltimos role ni togri kiriting!");
      }
      const existsSuperAdmin = await this.adminModel.findOne({ where: { role } });
      if (existsSuperAdmin) {
        throw new BadRequestException("Super admin faqat bitta bolishi mumkin");
      }
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

    const admin = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException("Bunday admin bazada topilmadi❌");
    }
    const { email, oldPassword, newPassword, ...rest} = updateAdminDto;

    if (email && email !== admin.email) {
      const exist = await this.adminModel.findOne({ where: { email } });
      if (exist) {
        throw new BadRequestException('Bunday email bilan admin allaqachon mavjud');
      }
    }
    let hashedPassword: string | undefined;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        throw new BadRequestException("Eski parol noto'g'ri kiritilgan");
      }

      hashedPassword = await bcrypt.hash(newPassword, 7);
    }

    const updateData: any = {
      ...rest,
    }
    if (email) {
      updateData.email = email;
    }
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }
    await admin.update(updateData);
    return admin;
  }

  async remove(id: number): Promise<object> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException("No admin found for this ID❌");
    }
    await admin.destroy();
    return { message: `Admin with ID ${id} has been removed` };
  }
}