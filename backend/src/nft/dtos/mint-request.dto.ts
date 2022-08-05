import { ApiProperty } from '@nestjs/swagger';

export class MintRequestDto {
  @ApiProperty({
    required: true,
    description: 'Address that will receive the tokens',
    example: '0x74121B1461631a021Dd36528baeBeCB45e61552f',
    minLength: 42,
    maxLength: 42,
  })
  toAddress: string;

  @ApiProperty({
    required: true,
    description: 'Data to attach to the NFT',
    example: 'Thanks for your help!',
    minLength: 0,
    maxLength: 155,
  })
  text: string;
}
