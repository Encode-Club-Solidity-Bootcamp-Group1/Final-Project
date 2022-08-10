import React, { ChangeEvent } from "react";

export function DescriptionInput(props: { callback: Function; }): JSX.Element {
  return <>
    <label htmlFor="descriptionTextArea" className="form-label inline-block mb-2 text-gray-700">Description</label>
    <textarea
      id="descriptionTextArea"
      name="description"
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
      cols={50} placeholder={'Your description'} onChange={(e: ChangeEvent) => props.callback(e)} />
  </>
}
