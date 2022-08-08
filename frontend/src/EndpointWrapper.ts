import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import multer from 'multer';

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
    console.debug('image', image.size, 'address:', address);
    let formData = new FormData();
    formData.append("image",image);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const url: string = `${this._basicUrl}/upload`;
    try {
      axios.post(url,formData, config).then((res: AxiosResponse) => {
        console.log('response:', res);
      })
    } catch (error) {
      console.error('could not send the image', error); 
    }

  }

  static saveKudo(obj: KudoDto):any {
    const url: string = `${this._basicUrl}/save-kudo`;
    try {
      axios.post(url, obj).then((res: AxiosResponse) => {
        console.log('saved Kudos!:', res);
      })
    } catch (error) {
      console.error('could not send the image', error); 
    }
  }

}

async function runGetQuery(url: string):Promise<KudoDto[]>{
  let final:KudoDto[] = [];
  // todo sort this out
  axios.get(url).then((res: AxiosResponse) => {
    final = res.data;
  }).catch((e: AxiosError) => {
    console.error(e);
  });
  return final;
}
