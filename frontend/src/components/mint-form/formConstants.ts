import { KudoDto } from "../../types/KudoDto";

export const BAD_ADDRESS = "not-connected";
export const fileTypes = ["JPG", "PNG", "SVG"];
export const DEFAULT_KUDO: KudoDto = {
  from: "",
  to: "",
  name: "",
  description: "",
  imageUrl: "",
  tokenId: ""
};
