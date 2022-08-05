import { Controller, Post, Body, Param } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './dto/mint-nft.dto';
import { BurnNftDto } from './dto/burn-nft.dto';
import { TransferNftDto } from './dto/transfer-nft.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post()
  mint(@Body() createNftDto: MintNftDto) {
    return this.nftService.mint(createNftDto);
  }

  @Post()
  transfer(@Body() transferNftDto: TransferNftDto) {
    return this.nftService.transfer(transferNftDto);
  }

  @Post()
  burn(@Body() burnNftDto: BurnNftDto) {
    return this.nftService.burn(burnNftDto);
  }
}
