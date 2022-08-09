import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { KudoDto } from "./types/KudoDto";

export default class ContractFacade {
  private static _contractAddress = '0x19CAa54ee0C72C1a5B1Cb7fe119685E296104983';
  private static _network = 'ropsten';

  static async deployNft(dto: KudoDto): Promise<any> {
    

    return null
  }
};
