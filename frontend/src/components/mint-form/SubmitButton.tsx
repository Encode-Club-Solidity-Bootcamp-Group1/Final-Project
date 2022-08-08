import React from "react";



export function SubmitButton(props: { callback?: Function, disabled: boolean }): JSX.Element {

  return <button type="submit" className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
    onClick={e => {
      console.log('submitting', e);
      props.callback!();
    }}
    disabled={props.disabled}
  >
    Mint NFT
  </button>
}
