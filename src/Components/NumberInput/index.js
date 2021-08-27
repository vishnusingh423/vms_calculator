import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./style.css";

function NumberInput({ type, value, onChange, placeholder, mask, disabled, format }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="input-div" style={{ border: focus && "1px solid #f7c168" }}>
      <NumberFormat
        format={format}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
        }}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mask={mask}
      />
    </div>
  );
}

export default NumberInput;
