import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../model/cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '2344234',
    description: 'id',
  })
  id: string;
}
