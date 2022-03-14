import React from "react";

const TextInput = ({
  label = "",
  placeholder = "",
  value = "",
  onChangeValue,
  setPlaceHolder,
  isPassword,
}) => {
  const onChangeTextInput = (e) => {
    onChangeValue(e.target.value);
  };
  const clearPlaceholder = () => {
    setPlaceHolder("");
  };

  return (
    <>
      <div>{label}</div>
      <input
        type={isPassword ? "password" : ""}
        placeholder={placeholder}
        value={value}
        onChange={onChangeTextInput}
        onClick={clearPlaceholder}
      />
    </>
  );
};

export default TextInput;
