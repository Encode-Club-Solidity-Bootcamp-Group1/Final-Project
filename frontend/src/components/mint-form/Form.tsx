import { ethers } from "ethers";
import { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import BlockchainService from "../../services/Blockchain.service";
import EndpointService from "../../services/Endpoint.service";
import { AccountContext } from "../wrappers/IdentityWrapper";
import { DescriptionInput } from "./DescriptionInput";
import { BAD_ADDRESS, getDefaultKudoWithWalletAddress, fileTypes } from "./formConstants";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

export function Form(props: { title: string; walletAdd: string }): JSX.Element {
  const [dto, setDto] = useState(getDefaultKudoWithWalletAddress(props.walletAdd));
  const [ownAddress, setOwnAddress] = useState(BAD_ADDRESS);
  const [file, setFile] = useState(null as unknown as Blob);

  const handleFileChange = (file: Blob) => setFile(file);

  const signer: ethers.Signer = useContext(AccountContext);
  const context = useContext(AccountContext);

  try {
    context.getAddress().then((v) => setOwnAddress(v));
  } catch (error) {
    console.log("not able to retrieve address yet");
  }

  const handleChange = (e: any) => {
    const target: any = e.target!;
    const value = target.value;
    const name = target.name;
    setDto({
      ...dto,
      [name]: value
    });
  }

  const submitCallback = () => {
    EndpointService.postImage(file, ownAddress).then((url: string) => {
      console.log("successful file upload");
      dto.imageUrl = url;
      BlockchainService.deployNft(dto, signer).then((response: any) => {
        EndpointService.saveKudo(dto).then((response: string) => {
          console.log("successful saving of the kudo as an NFT,", response);
        });
      });
    });
  };

  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
          {props.title}
        </h6>
        <form>
          <InputField
            placeholder="from"
            title="From (your address will appear when you connect your wallet)"
            value={props.walletAdd}
            onChange={handleChange}
            disabled
          />
          <InputField placeholder="to" value={dto.to} onChange={handleChange} />
          <InputField placeholder="name" value={dto.name} onChange={handleChange} />
          <DescriptionInput callback={handleChange} />
          <FileUploader
            className="
      form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            handleChange={handleFileChange}
            hoverTitle="drop your image here"
            name="file"
            types={fileTypes}
          />
          <small id="help" className="block mt-1 text-xs text-gray-600">
            for now it'll live on the Ropsten network
          </small>
          {ownAddress === BAD_ADDRESS && <p>First connect with your wallet!</p>}
          <SubmitButton
            disabled={ownAddress === BAD_ADDRESS || !file}
            callback={submitCallback}
          />
        </form>
      </div>
    </>
  );
}
