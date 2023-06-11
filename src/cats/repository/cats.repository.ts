import { HttpException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Cat } from '../model/cats.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/comments/model/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async finCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');

    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });

    return cat;
  }

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

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    return newCat.readOnlyData;
  }

  async findAll() {
    const result = await this.catModel
      .find()
      .populate({ path: 'comments', model: this.commentsModel });

    return result;
  }
}
