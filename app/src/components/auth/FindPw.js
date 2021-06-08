import React, { useContext, useState, useEffect, useRef } from "react";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { Input, Button } from "../index";
import { ProgressContext } from "../../contexts";
import {
  checkStudent,
  removeWhitespace,
  validateEmail,
} from "../../utils/common";

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

function FindPw() {
  const [findPw, setFindPw] = useState("");
  const [studentId, setStuedntId] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const didmountRef = useRef();
  const emailRef = useRef();

  const { spinner } = useContext(ProgressContext);

  const _handleStudentIdChange = (studentId) => {
    setStuedntId(removeWhitespace(studentId));
  };

  const _handleEmailChange = (email) => {
    setEmail(removeWhitespace(email));
  };

  const _handleFindPwSucess = (json) => {
    setFindPw(json);
    Alert.alert("이메일로 발송된 URL을 통해 비밀번호를 재설정 할 수 있습니다");
  };

  const _handleFindPwButtonPress = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: studentId,
          email: email,
        }),
      };

      let response = await fetch(
        "https://idu-market.shop:9800/api/forgot-password",
        config
      );
      let json = await response.json();

      json.success ? _handleFindPwSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!checkStudent(studentId)) {
        _errorMessage = "아이디 형식을 지켜주세요";
      } else if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 지켜주세요";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [studentId, email]);

  useEffect(() => {
    setDisabled(!(studentId && email && !errorMessage));
  }, [studentId, email, errorMessage]);

  return (
    <Container>
      <Input
        label="아이디"
        value={studentId}
        onChangeText={_handleStudentIdChange}
        onSubmitEditing={() => emailRef.current.focus()}
        placeholder="아이디"
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
        title="비밀번호 찾기"
        onPress={_handleFindPwButtonPress}
        disabled={disabled}
      />
    </Container>
  );
}

export default FindPw;
