import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) { }

  create(createPhotoDto: any) {
    const keys = ["competitors", "users", "judges"];

    delete createPhotoDto['id']
    keys.map((key: any) => {
      delete createPhotoDto[key + 'Id']
    })

    const newCreatePhotosDto = {
      data: createPhotoDto,
      include: {
        competitors: true,
        users: true,
      },
    }

    keys.map((key: any) => {
      if (createPhotoDto[key]) {
        const id = createPhotoDto[key].id
        delete createPhotoDto[key]
        newCreatePhotosDto.data = {
          ...newCreatePhotosDto.data,
          [key]: {
            connect: {
              id: id
            }
          }
        }
      }
    })

    return this.prisma.photos.create(newCreatePhotosDto);
  }

  findAll() {
    return `This action returns all photos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
