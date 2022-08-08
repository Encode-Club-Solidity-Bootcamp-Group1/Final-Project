import axios, {AxiosResponse, AxiosError} from 'axios';

import { KudoDto } from "./types/KudoDto";


export default class Endpoints{
  private static _basicUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'herokuUrl';
    // todo make the heroku Url

  static async getSent(address:string):Promise<KudoDto[]> {

    const url: string = `${this._basicUrl}/kudos/sent/${address}`;
    return await runGetQuery(url);

  } 

  static async getReceived(address:string):Promise<KudoDto[]>{
    const url: string = `${this._basicUrl}/kudos/received/${address}`;
    return await runGetQuery(url);
  }

  static postImage(image: Blob, address:string):any {

  }

  static saveKudo():any {

  }
}

async function runGetQuery(url: string):Promise<KudoDto[]>{
  let final:KudoDto[] = [];
  // todo sort this out
  axios.get(url).then((res: AxiosResponse) => {
    console.log(res);
  }).catch((e: AxiosError) => {
    console.error(e);
  });
  return final;
}
