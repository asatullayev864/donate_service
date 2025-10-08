import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { full_name, email, password, card_number, is_active, role } = createUserDto;

    if (!full_name || !email || !password || !card_number) {
      throw new NotFoundException("Iltimos barcha malumotlarni kiriting!!!");
    }

    if (role?.toUpperCase() !== "USER") {
      throw new BadRequestException("Iltimos rolni togri kiriting!  Role faqat user bolishi mumkin!");
    }

    const exists = await this.userModel.findOne({ where: { email } });
    if (exists) {
      throw new BadRequestException(`Email "${email}" already exists❌`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      full_name,
      email,
      password: hashedPassword,
      card_number,
      is_active,
    });

    return user;
  }

  // FIND ALL
  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    if (!users.length) {
      throw new NotFoundException('No users found❌');
    }
    return users;
  }

  // FIND ONE
  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found❌`);
    }
    return user;
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found❌`);
    }

    // Agar email o‘zgartirilsa, unikal bo‘lishini tekshiramiz
    if (updateUserDto.email) {
      const exists = await this.userModel.findOne({
        where: { email: updateUserDto.email },
      });
      if (exists && exists.id !== id) {
        throw new BadRequestException(
          `Email "${updateUserDto.email}" already exists❌`,
        );
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userModel.update(updateUserDto, { where: { id } });
    return await this.userModel.findByPk(id);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found❌`);
    }

    await user.destroy();
    return { message: 'User successfully deleted✅' };
  }
}