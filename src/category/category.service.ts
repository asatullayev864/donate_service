import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const exists = await this.categoryModel.findOne({ where: { name } });
    if (exists) {
      throw new BadRequestException('This category name already exists❌');
    }

    const category = await this.categoryModel.create({ name });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryModel.findAll();
    if (!categories.length) {
      throw new NotFoundException('No categories found❌');
    }
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found❌`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found❌`);
    }

    if (updateCategoryDto.name) {
      const exists = await this.categoryModel.findOne({ where: { name: updateCategoryDto.name } });
      if (exists && exists.id !== id) {
        throw new BadRequestException('This category name is already in use❌');
      }
    }

    await category.update(updateCategoryDto);
    return category;
  }

  async remove(id: number): Promise<{ message: string }> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found❌`);
    }

    await category.destroy();
    return { message: 'Category successfully deleted✅' };
  }
}