import { KudoDto } from "../../types/KudoDto";

export const BAD_ADDRESS = "not-connected";
export const fileTypes = ["JPG", "PNG", "SVG"];
const DEFAULT_KUDO: KudoDto = {
  from: "",
  to: "",
  name: "",
  description: "",
  imageUrl: "",
  tokenId: ""
};

export const getDefaultKudoWithWalletAddress=(from: string): KudoDto=>{
  let kudo = DEFAULT_KUDO;
  kudo.from = from;
  return kudo;
}
