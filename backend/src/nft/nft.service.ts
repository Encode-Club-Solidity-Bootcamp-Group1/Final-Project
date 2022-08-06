import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/shared/services/provider/provider.service';
import { SignerService } from '../shared/services/signer/signer.service';
import { ethers } from 'ethers';
import * as TokenContract from 'src/assets/contracts/Token.json';

@Injectable()
export class NftService {
  contractPublicInstance;
  contractSignedInstance;

  constructor(
    private providerService: ProviderService,
    private signerService: SignerService,
  ) {
    this.setupContractInstances();
  }

  setupContractInstances() {
    const contractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    if (!contractAddress || contractAddress.length === 0) return;
    this.contractPublicInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.providerService.provider,
    );
    this.contractSignedInstance = new ethers.Contract(
      contractAddress,
      TokenContract.abi,
      this.signerService.signer,
    );
  }

  async mint(toAddress: string, text: string) {
    const tx = await this.contractSignedInstance.mint(toAddress, text);
    return tx;
  }

  transfer() {
    return `This action transfer a nft`;
  }

  burn() {
    return `This action burns a NFT`;
  }
}
