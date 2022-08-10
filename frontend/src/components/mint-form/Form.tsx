import { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Endpoints from "../../EndpointWrapper";
import { KudoDto } from "../../types/KudoDto";
import { AccountContext } from "../wrappers/IdentityWrapper";
import { DescriptionInput } from "./DescriptionInput";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

type StateData = {
  kudo: KudoDto;
  image: Blob;
};

const BAD_ADDRESS = "not-connected";
export function Form(props: { title: string; walletAdd: string }): JSX.Element {
  const fileTypes = ["JPG", "PNG", "SVG"];
  const [file, setFile] = useState(null as unknown as Blob);
  const handleFileChange = (file: Blob) => {
    setFile(file);
  };

  const [address, setAddress] = useState(BAD_ADDRESS);
  const context = useContext(AccountContext);
  try {
    context.getAddress().then((v) => setAddress(v));
  } catch (error) {
    console.log("not able to retrieve address yet");
  }

  const submitCallback = (data: StateData) => {
    Endpoints.postImage(file, address);
    // Endpoints.saveKudo(data);
  };

  const [dto, setDto] = useState({} as StateData);
  return (
    <>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
          {props.title}
        </h6>
        <form>
          <InputField placeholder="from" walletAdd={props.walletAdd} />
          <InputField placeholder="to" />
          <InputField placeholder="name" />
          <DescriptionInput callback={(e: any) => console.log(e)} />
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
          {address === BAD_ADDRESS && <p>First connect with your wallet!</p>}
          <SubmitButton
            disabled={address === BAD_ADDRESS}
            callback={submitCallback}
          />
        </form>
      </div>
    </>
  );
}
