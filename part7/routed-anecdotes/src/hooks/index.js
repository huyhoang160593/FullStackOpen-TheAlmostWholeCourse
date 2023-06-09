import { useState } from "react";

/** @param {Extract<React.HTMLInputTypeAttribute, 'text' | 'button' | 'reset'>} type */
export const useField = (type) => {
  const [value, setValue] = useState('')

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}