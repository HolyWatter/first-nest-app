import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    if (result) return true;
    else return false;
  }

  async createCat(email: string, password: string, name: string) {
    const result = await this.catModel.create({
      email,
      password,
      name,
    });

    return result;
  }
}
