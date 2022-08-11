import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { KudoDto } from "../types/KudoDto";

export default class EndpointService {
  private static _basicUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000"
      : "https://kudos-encode.herokuapp.com";
  // todo make the heroku Url

  static async getSent(address: string): Promise<any[any]> {
    const url: string = `${this._basicUrl}/kudos/sent/${address}`;
    console.log("url:", url);
    const result = await runGetQuery(url);
    console.log("result, ", result);
    return result;
  }

  static async getReceived(address: string): Promise<any[any]> {
    const url: string = `${this._basicUrl}/kudos/received/${address}`;
    console.log("url:", url);
    const result = await runGetQuery(url);
    console.log("result, ", result);
    return result;
  }

  static async postImage(image: Blob, address: string): Promise<string> {
    console.debug("image", image.size, "address:", address);
    let formData = new FormData();

    formData.append("file", image);
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const url: string = `${this._basicUrl}/upload`;
    let answerImageUrl: string = "";
    console.log(
      "url:",
      url,
      "form data:",
      formData,
      formData.entries(),
      " config",
      config
    );
    try {
      const response = await axios.post(url, formData, config);
      answerImageUrl = response.data;
    } catch (error) {
      console.error("could not send the image", error);
    }
    return answerImageUrl;
  }

  static async saveKudo(obj: KudoDto): Promise<string> {
    const url: string = `${this._basicUrl}/save-kudo`;
    let response = "";
    try {
      await axios.post(url, obj).then((res: AxiosResponse) => {
        console.log("saved Kudos!:", res);
        response = res.statusText;
      });
    } catch (error) {
      console.error("could not send the image", error);
      response = error as string;
    }
    return response;
  }
}

async function runGetQuery(url: string): Promise<{ data: [any] }> {
  let final: KudoDto[] = [];
  // todo sort this out
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("could not get the data", error);
  }
  return { data: ["could not get the data"] };
}
