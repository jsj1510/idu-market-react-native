import React, { useContext, useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { Input, Button } from "../index";
import { ProgressContext } from "../../contexts";
import { checkName, removeWhitespace, validateEmail } from "../../utils/common";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  width: 100%;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  padding-left: 40px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

function FindId() {
  const [FindId, setFindId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const didmountRef = useRef();
  const emailRef = useRef();

  const { spinner } = useContext(ProgressContext);

  const _handleStudentIdChange = (name) => {
    setName(removeWhitespace(name));
  };

  const _handleEmailChange = (email) => {
    setEmail(removeWhitespace(email));
  };

  const _handleFindIdSucess = (json) => {
    setFindId(json);
    Alert.alert("해당 이메일로 ID가 발송되었습니다.");
  };

  const _handleFindIdButtonPress = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      };

      let response = await fetch(
        "https://idu-market.shop:9800/api/forgot-id",
        config
      );
      let json = await response.json();

      json.success ? _handleFindIdSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!checkName(name)) {
        _errorMessage = "이름 형식을 지켜주세요";
      } else if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 지켜주세요";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [name, email]);

  useEffect(() => {
    setDisabled(!(name && email && !errorMessage));
  }, [name, email, errorMessage]);

  return (
    <Container>
      <Input
        label="이름"
        value={name}
        onChangeText={_handleStudentIdChange}
        onSubmitEditing={() => emailRef.current.focus()}
        placeholder="이름"
        returnKeyType="next"
      />
      <Input
        ref={emailRef}
        label="이메일"
        value={email}
        onChangeText={_handleEmailChange}
        onSubmitEditing={() => {}}
        placeholder="이메일"
        returnKeyType="done"
      />
      <ErrorText>{errorMessage}</ErrorText>
      <Button
        title="아이디 찾기"
        onPress={_handleFindIdButtonPress}
        disabled={disabled}
      />
    </Container>
  );
}

export default FindId;
