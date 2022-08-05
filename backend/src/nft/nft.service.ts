import { Injectable } from '@nestjs/common';
import { MintNftDto } from './dto/mint-nft.dto';
import { BurnNftDto } from './dto/burn-nft.dto';
import { TransferNftDto } from './dto/transfer-nft.dto';

@Injectable()
export class NftService {
  mint(createNftDto: MintNftDto) {
    return 'This action adds a new nft';
  }

  transfer(transferNftDto: TransferNftDto) {
    return `This action transfer a nft`;
  }

  burn(burnNftDto: BurnNftDto) {
    return `This action burns a NFT`;
  }
}
