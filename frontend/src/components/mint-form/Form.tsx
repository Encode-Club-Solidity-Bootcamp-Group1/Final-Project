import React from "react"

export function Form(props: { title: string }): JSX.Element {

  return <div>
    <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">{props.title}</h6>
  </div>
}