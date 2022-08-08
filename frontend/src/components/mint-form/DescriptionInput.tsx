import React, { ChangeEvent } from "react";

export function DescriptionInput(props: { callback: Function; }): JSX.Element {
  return <textarea
    id="w3review"
    name="w3review"
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
    rows={4}
    cols={50} value={'test'} onChange={(e: ChangeEvent) => props.callback(e)} />;
}
