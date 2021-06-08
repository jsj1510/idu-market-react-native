import React, { useState, forwardRef } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: column;
  width: 90%;
  margin: 10px 0;
`;
const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 5px;
  margin-left: 3px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.focusText : theme.label};
`;
const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme, editable }) =>
    editable ? theme.background : theme.inputDisabledBackground};
  color: ${({ theme }) => theme.text};
  padding: 19px 10px;
  font-size: 16px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
  border-radius: 4px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

//ref 에 props를 사용하기위해 fowardRef사용
const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          textContentType="none" // iOS only
          underlineColorAndroid="transparent" // Android only
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

export default Input;
