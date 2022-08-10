import {
  Controller,
  Get,
  UploadedFile,
  UseInterceptors,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AppService } from './app.service';
import { NFTStorage, File } from 'nft.storage';

import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { KudoDto } from './KudoDto';

const db = new JsonDB(new Config('myDataBase', true, false, '/'));
const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmJBMTI3NzgyQ2YwMzY5RWJlNjBjNWQ3RTY3NTdhMjMzMzkzMWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1Nzk3MzY5MDkxNiwibmFtZSI6ImJvb3RjYW1wIn0.jc9Sygkjdnk8WnuQqmumVzUkA8emzQ9Vt7bltkkNSbw';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const cid = await nftStorage.storeBlob(
      new File([file.buffer], file.originalname),
    );
    return `https://ipfs.io/ipfs/${cid}`;
  }

  @Post('save-kudo')
  async saveKudo(@Body() kudoDto: KudoDto) {
    console.log('pushing a new kudo to db:', kudoDto);
    db.push(`/kudos/${kudoDto.tokenId}`, kudoDto);
    return { message: 'data saved' };
  }

  @Get('/kudos/received/:address')
  async getReceivedKudos(@Param() params) {
    const isDataExists = await db.exists('/kudos');
    if (!isDataExists) {
      return { error: 'db is empty' };
    }
    const kudos = await db.getData('/kudos');
    const kudosArray = Object.keys(kudos).map((key) => kudos[key]);
    const received = kudosArray.filter((kudo) => kudo.to === params.address);
    return received;
  }

  @Get('/kudos/sent/:address')
  async getSentKudos(@Param() params) {
    const isDataExists = await db.exists('/kudos');
    if (!isDataExists) {
      return { error: 'db is empty' };
    }
    const kudos = await db.getData('/kudos');
    const kudosArray = Object.keys(kudos).map((key) => kudos[key]);

    const sent = kudosArray.filter((kudo) => kudo.from === params.address);
    return sent;
  }
}
