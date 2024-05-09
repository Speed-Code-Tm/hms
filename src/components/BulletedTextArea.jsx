import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #fff;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 0.5rem;
  outline: none;
  line-height: 1.5;
`;

const BulletedTextArea = ({
  label,
  value,
  onChange,
  placeholder,
  bulletStyle = "- ",
}) => {
  const [textValue, setTextValue] = useState(value ? value : "");
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current && !textValue) {
      setTextValue(bulletStyle);
      textAreaRef.current.focus();
    }
  }, [textValue, bulletStyle]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTextValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (value) {
      setTextValue(value);
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newValue =
        textValue.substring(0, selectionStart) +
        "\n" +
        bulletStyle +
        textValue.substring(selectionEnd);
      setTextValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <TextAreaContainer>
      {label && <label style={{ marginBottom: "0.5rem" }}>{label}</label>}
      <TextArea
        ref={textAreaRef}
        value={textValue.toString()}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={Math.max(textValue.toString().split("\n").length, 3)} // Ensure a minimum height
      />
    </TextAreaContainer>
  );
};

export default BulletedTextArea;