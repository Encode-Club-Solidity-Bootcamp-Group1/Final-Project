import React from "react";



export function InputField(props: { placeholder: string; onClick?: Function; }): JSX.Element {
  return <div className="form-group mb-6">
    <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700">{props.placeholder}</label>
    <input type="email" className="form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
      aria-describedby={props.placeholder} placeholder={props.placeholder} />
  </div>;
}