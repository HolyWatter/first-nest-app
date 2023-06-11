import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../model/comments.schema';
import { Model } from 'mongoose';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CatsRepository } from 'src/cats/repository/cats.repository';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async createComment(id: string, comments: CommentsCreateDto) {
    try {
      const commentTargetCat =
        await this.catsRepository.finCatByIdWithoutPassword(id);
      const { contents, author } = comments;
      const validatedAuthor =
        await this.catsRepository.finCatByIdWithoutPassword(author);
      const newComment = await this.commentModel.create({
        author: validatedAuthor._id,
        contents,
        info: commentTargetCat._id,
      });

      return newComment;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async getAllComments(id: string) {
    const allComments = await this.commentModel.find({ info: id });

    return allComments;
  }
}
