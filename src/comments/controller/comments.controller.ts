import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 댓글 가져오기',
  })
  @Get(':id')
  async getAllComments(@Param('id') id) {
    return this.commentsService.getAllComments(id);
  }

  @ApiOperation({
    summary: '댓글작성',
  })
  @Post(':id')
  async createComment(@Param('id') id, @Body() body: CommentsCreateDto) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({
    summary: '좋아요 누르기',
  })
  @Post(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
