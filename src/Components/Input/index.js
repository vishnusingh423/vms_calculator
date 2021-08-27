import React, { useState } from "react";
import "./style.css";

function Input({
  type,
  value,
  onChange,
  placeholder,
  icon,
  autoFocus,
  hideSearch,
  disabled,
  onkeydown,
  required
}) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="input-div" style={{ border: focus && "1px solid #f7c168" }}>
      {icon}
      <input
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          hideSearch && hideSearch();
        }}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={onkeydown}
        required={required}
      />
    </div>
  );
}

export default Input;
