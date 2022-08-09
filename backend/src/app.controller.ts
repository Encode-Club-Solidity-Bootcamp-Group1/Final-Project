import {
  Controller,
  Get,
  UploadedFile,
  UseInterceptors,
  Post,
  Body,
  Param,
  Injectable,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Express } from 'express';
import { AppService } from './app.service';
import { NFTStorage, File } from 'nft.storage';
import { Kudo, KudoDocument } from './schemas/kudo.schema';
import { Model } from 'mongoose';

const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmJBMTI3NzgyQ2YwMzY5RWJlNjBjNWQ3RTY3NTdhMjMzMzkzMWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1Nzk3MzY5MDkxNiwibmFtZSI6ImJvb3RjYW1wIn0.jc9Sygkjdnk8WnuQqmumVzUkA8emzQ9Vt7bltkkNSbw';

export class KudoDto {
  from: string;
  to: string;
  name: string;
  description: string;
  imageUrl: string;
  tokenId: string;
}

@Injectable()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel(Kudo.name) private readonly kudoModel: Model<KudoDocument>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cid = await nftstorage.storeBlob(
      new File([file.buffer], file.originalname),
    );
    return `https://ipfs.io/ipfs/${cid}`;
  }

  @Post('save-kudo')
  async saveKudo(@Body() kudoDto: KudoDto) {
    await this.kudoModel.create(kudoDto);
    return { message: 'data saved' };
  }

  @Get('/kudos/received/:address')
  async getReceivedKudos(@Param() params) {
    const received = await this.kudoModel.find({ to: params.address });
    if (received.length === 0) {
      return { error: 'db is empty' };
    }
    return received;
  }

  @Get('/kudos/sent/:address')
  async getSentKudos(@Param() params) {
    const sent = await this.kudoModel.find({ from: params.address });
    if (sent.length === 0) {
      return { error: 'db is empty' };
    }
    return sent;
  }
}
