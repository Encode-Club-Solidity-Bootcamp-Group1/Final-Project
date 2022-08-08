import React, { useState } from "react"
import Endpoints from "../../EndpointWrapper";
import { KudoDto } from "../../types/KudoDto"
import { DragDrop } from "../upload-image/Drop";
import { DescriptionInput } from "./DescriptionInput";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

const emptyKudoDto: KudoDto = {
  from: "",// todo create form fields to input these
  to: "",// todo create form fields to input these
  name: "",// todo create form fields to input these
  description: "",// todo create form fields to input these
  imageUrl: "", // todo need to upload the image, then have the url loaded silently
  tokenId: "" // not in the original form
};

export function Form(props: { title: string }): JSX.Element {
  const callbAck = (data: KudoDto) => {
    // todo need to have the new data format
    Endpoints.postImage(data.imageUrl);
    Endpoints.saveKudo(data);
  }

  const [dto, setDto] = useState({} as KudoDto);
  return <>
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">{props.title}</h6>
      <form>
        <InputField placeholder='from' />
        <InputField placeholder="to" />
        <InputField placeholder="name" />
        <DescriptionInput callback={(e: any) => console.log(e)} />
        <DragDrop callback={(e: any) => console.log(e)} />
        <small id="help" className="block mt-1 text-xs text-gray-600">for now it'll live on the Ropsten network</small>
        <SubmitButton />
      </form>
    </div >
  </>
}


