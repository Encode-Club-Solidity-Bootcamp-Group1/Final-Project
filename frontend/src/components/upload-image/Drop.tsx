import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "SVG"];

export function DragDrop(props: { callback: Function }): JSX.Element {
  const [file, setFile] = useState(null as unknown as Blob);
  const handleChange = (file: Blob) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange}
      hoverTitle='drop your image here'
      name="file" types={fileTypes} />
  );
}
