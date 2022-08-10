import { ethers } from 'ethers';
import abi from '../data/contract-abi.json';
import { KudoDto } from "../types/KudoDto";
import { ProviderService } from './Provider.service';

export default class BlockchainService {
  private static _contractAddress = '0x19CAa54ee0C72C1a5B1Cb7fe119685E296104983';

  static async deployNft(dto: KudoDto): Promise<number> {
    const providerService = new ProviderService();
    
    const contract = new ethers.Contract(this._contractAddress,
      abi,
      providerService.provider
    );
    // todo setup typechain
    let tokenId: number = -1;
    try {
    tokenId = await contract.sendKudos({
     address: this._contractAddress,
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl
    });
    } catch (error) {
      console.error('could not mint nft',error);
    }
    return tokenId;
  }
};
