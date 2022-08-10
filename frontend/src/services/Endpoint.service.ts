import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { KudoDto } from '../types/KudoDto';

export default class EndpointService {
  private static _basicUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'herokuUrl';
  // todo make the heroku Url

  static async getSent(address: string): Promise<KudoDto[]> {
    const url: string = `${this._basicUrl}/kudos/sent/${address}`;
    const result = await runGetQuery(url);
    console.log('result, ', result);
    return result;
  }

  static async getReceived(address: string): Promise<KudoDto[]> {
    const url: string = `${this._basicUrl}/kudos/received/${address}`;
    const result = await runGetQuery(url);
    console.log('result, ', result);
    return result;
  }

  static async postImage(image: Blob, address: string): Promise<string> {
    console.debug('image', image.size, 'address:', address);
    let formData = new FormData();

    formData.append('file', image);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const url: string = `${this._basicUrl}/upload`;
    let answerImageUrl: string = '';
    console.log('url:', url, 'form data:', formData, formData.entries(), ' config', config);
    try {
      const response = await axios.post(url, formData, config);
      console.log('response:', response);
      answerImageUrl = response.data;
    } catch (error) {
      console.error('could not send the image', error);
    }
    return answerImageUrl;
  }

  static async saveKudo(obj: KudoDto): Promise<string> {
    const url: string = `${this._basicUrl}/save-kudo`;
    let response = '';
    try {
      await axios.post(url, obj).then((res: AxiosResponse) => {
        console.log('saved Kudos!:', res);
        response = res.statusText;
      });
    } catch (error) {
      console.error('could not send the image', error);
      response = error as string;
    }
    return response;
  }
}

async function runGetQuery(url: string): Promise<KudoDto[]> {
  let final: KudoDto[] = [];
  // todo sort this out
  axios
    .get(url)
    .then((res: AxiosResponse) => {
      // console.log('axios response from get query', res);
      final = res.data;
    })
    .catch((e: AxiosError) => {
      console.error(e);
    });
  return final;
}
