import React, { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AccountContext } from "../wrappers/IdentityWrapper";

const fileTypes = ["JPG", "PNG", "SVG"];

export function DragDrop(props: { callback: Function }): JSX.Element {
  const [file, setFile] = useState(null as unknown as Blob);
  const [address, setAddress] = useState('no address');
  const handleChange = (file: Blob) => {
    setFile(file);
  };
  const testContext = useContext(AccountContext);
  try {
    
    testContext.getAddress().then(v => setAddress(v));
  } catch (error) {
    console.error(error);
  }
  return <>

    <FileUploader handleChange={handleChange}
      hoverTitle='drop your image here'
      name="file" types={fileTypes} />
    <p>{address}</p>
  </>

}
