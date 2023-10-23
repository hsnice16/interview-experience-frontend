import React, { ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";

type CustomInputProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  type: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  error?: string;
  label: string;
};

export function CustomInput({
  value,
  onChange,
  id,
  type,
  placeholder,
  name,
  required,
  error,
  label,
}: CustomInputProps) {
  return (
    <>
      <label htmlFor={id}>
        {label} {required ? <span>*</span> : null}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <span className={styles["input-error"]}>{error}</span> : null}
    </>
  );
}
