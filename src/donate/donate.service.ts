import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { Donate } from './models/donate.model';

@Injectable()
export class DonateService {
  constructor(
    @InjectModel(Donate)
    private readonly donateModel: typeof Donate,
  ) { }

  // ✅ 1. Yangi donate yaratish
  async create(createDonateDto: CreateDonateDto): Promise<Donate> {
    const { recipientId, userId } = createDonateDto;

    if (!recipientId || !userId) {
      throw new BadRequestException("recipientId va userId kiritilishi shart❗️");
    }

    const donate = await this.donateModel.create({
      ...createDonateDto
    });
    return donate;
  }

  // ✅ 2. Barcha donate yozuvlarini olish
  async findAll(): Promise<Donate[]> {
    return this.donateModel.findAll({ include: { all: true } });
  }

  // ✅ 3. ID orqali bitta donate topish
  async findOne(id: number): Promise<Donate> {
    const donate = await this.donateModel.findByPk(id, { include: { all: true } });
    if (!donate) {
      throw new NotFoundException(`ID raqami ${id} bo'lgan donate topilmadi❌`);
    }
    return donate;
  }

  // ✅ 4. Donate ma’lumotini yangilash
  async update(id: number, updateDonateDto: UpdateDonateDto): Promise<Donate> {
    const donate = await this.findOne(id); // mavjudligini tekshiramiz

    await this.donateModel.update(updateDonateDto, { where: { id } });

    // Yangilangan holatini qaytaramiz
    return this.findOne(id);
  }

  // ✅ 5. Donate o‘chirish
  async remove(id: number): Promise<object> {
    const donate = await this.findOne(id);
    await donate.destroy();
    return { message: `ID raqami ${id} bo'lgan donate muvaffaqiyatli o‘chirildi✅` };
  }
}