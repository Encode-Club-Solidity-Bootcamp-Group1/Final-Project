import { Controller, Post, Body, Param, HttpException } from '@nestjs/common';
import { NftService } from './nft.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MintRequestDto } from './dtos/mint-request.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('mint-nft')
  @ApiOperation({
    summary: 'Mint NFT',
    description:
      'Requests the server to mint an NFT tokens with the provided data',
  })
  @ApiResponse({
    status: 200,
    description: 'NFT ID',
    type: Number,
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: HttpException,
  })
  async mintNFT(@Body() mintRequestDto: MintRequestDto) {
    try {
      const result = await this.nftService.mint(
        mintRequestDto.toAddress,
        mintRequestDto.text,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Post()
  transfer() {
    return this.nftService.transfer();
  }

  @Post()
  burn() {
    return this.nftService.burn();
  }
}
