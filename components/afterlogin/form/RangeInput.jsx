import React from "react"

const RangeInput = ({ value, onChange, max, step, min = 0 }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      max={max}
      step={step}
      min={min}
      className="accent-emerald-500 w-full outline-none"
    />
  )
}

export default RangeInput
