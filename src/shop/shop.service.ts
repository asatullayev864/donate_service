import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Shop } from "./models/shop.model";
import { CreateShopDto } from "./dto/create-shop.dto";
import { UpdateShopDto } from "./dto/update-shop.dto";
import { Recipient } from "../recipient/models/recipient.model";
import { Category } from "../category/models/category.model";

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop) private readonly shopModel: typeof Shop
  ) { }

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const { name, count, price, title, recipientId, categoryId } = createShopDto;

    if (!name || !count || !price || !title || !recipientId || !categoryId) {
      throw new BadRequestException("All fields are required‼️");
    }

    const exists = await this.shopModel.findOne({ where: { name } });
    if (exists) {
      throw new BadRequestException("Shop name already exists❌");
    }

    const newShop = await this.shopModel.create(createShopDto);
    return newShop;
  }

  async findAll(): Promise<Shop[]> {
    const shops = await this.shopModel.findAll({
      include: [
        {
          model: Recipient,
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    if (shops.length === 0) {
      throw new NotFoundException("No shop data found❌");
    }

    return shops;
  }

  async findOne(id: number): Promise<Shop> {
    const shop = await this.shopModel.findOne({
      where: { id },
      include: [
        {
          model: Recipient,
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!shop) {
      throw new NotFoundException("No shop found for this ID❌");
    }

    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shops = await this.shopModel.findOne({ where: { id } });
    if (!shops) {
      throw new NotFoundException("No shop found for this ID❌");
    }

    const { name } = updateShopDto;
    if (name) {
      const exists = await this.shopModel.findOne({ where: { name } });
      if (exists && exists.id !== id) {
        throw new BadRequestException("This shop name is already in use❗️");
      }
    }

    await this.shopModel.update(updateShopDto, { where: { id } });

    const shop = await this.shopModel.findOne({
      where: { id },
      include: [
        {
          model: Recipient,
          attributes: ["id", "name", "email"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found❌`);
    }

    return shop;
  }

  async remove(id: number) {
    const shop = await this.shopModel.findOne({ where: { id } });
    if (!shop) {
      throw new NotFoundException("No shop found for this ID❌");
    }

    await this.shopModel.destroy({ where: { id } });
    return { message: "Shop successfully deleted✅" };
  }
}