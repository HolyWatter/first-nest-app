import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsRepository } from '../repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getAllComments(id: string) {
    return await this.commentsRepository.getAllComments(id);
  }

  async createComment(id: string, comments: CommentsCreateDto) {
    return await this.commentsRepository.createComment(id, comments);
  }

  async plusLike(id) {}
}
