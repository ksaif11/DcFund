import React from "react";

const FormInput = ({ type, label, placeholder, value, onChange }) => {
  return (
    <label className="w-full">
      <span className="text-neutral-400 block text-xl">{label}*</span>
      {type === "textarea" ? (
        <textarea
          className="bg-black text-neutral-300 placeholder-neutral-500 w-full resize-none rounded-lg p-4 outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          rows={5} // Fix: Convert the "rows" attribute value from a string to a number
          spellCheck="false"
        />
      ) : (
        <input
          className="bg-neutral-700 text-neutral-300 placeholder-neutral-500 w-full rounded-lg p-4 outline-none"
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          value={value}
          step={0.1}
          min={0.1}
          spellCheck="false"
        />
      )}
    </label>
  );
};

export default FormInput;
