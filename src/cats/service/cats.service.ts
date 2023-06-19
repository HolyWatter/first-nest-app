import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../repository/cats.repository';
import { Cat } from '../model/cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('this email is already exist');
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const cat = await this.catsRepository.createCat(email, hashPassword, name);

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Array<Express.Multer.File>) {
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );

    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();

    const readOnlyCat = allCat.map((cat) => cat.readOnlyData);

    return readOnlyCat;
  }
}
