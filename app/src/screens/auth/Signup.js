import React, { useState, useRef, useEffect, useContext } from "react";
import { Alert } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import { ProgressContext, StudentContext } from "../../contexts";
import { Button, Input } from "../../components";
import {
  validateEmail,
  removeWhitespace,
  checkNickname,
  checkStudent,
  checkPassword,
  checkName,
} from "../../utils/common";
import major from "../../utils/majors";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
  height: 800;
  margin: 30px;
`;

const Containers = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

function Signup() {
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(StudentContext);

  const [selectedMajor, setSelectedMajor] = useState({});
  const [student, setStudent] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState("");

  const nicknameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didmountRef = useRef();

  useEffect(() => {
    // 오류메시지가 바로뜨는걸 막는다.
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!checkStudent(student)) {
        _errorMessage = "아이디를 제대로 입력하세요";
      } else if (!checkName(name)) {
        _errorMessage = "공백없이 한글로만 입력해주세요";
      } else if (!checkNickname(nickname)) {
        _errorMessage = "별명은 최대 8글자입니다 (모음,자음 불가)";
      } else if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 지켜주세요";
      } else if (!checkPassword(password)) {
        _errorMessage =
          "비밀번호는 영문,특수문자,숫자가 포함된 9자 이상이여야 합니다.";
      } else if (password !== passwordConfirm) {
        _errorMessage = "비밀번호가 일치하지 않습니다.";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [student, name, nickname, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(student && name && nickname && email && password && !errorMessage)
    );
  }, [student, name, nickname, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: student,
          name: name,
          nickname: nickname,
          email: email,
          major: selectedMajor.value,
          psword: password,
        }),
      };

      let response = await fetch(
        "https://idu-market.shop:9800/api/student",
        config
      );
      let json = await response.json();
      json.success ? _handleSuccessSignup(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("회원가입 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleSuccessSignup = (json) => {
    dispatch(json);
    Alert.alert("회원가입 성공");
  };

  function onChange() {
    return (el) => setSelectedMajor(el);
  }

  return (
    <Containers>
      <KeyboardAwareScrollView extraScrollHeight={30}>
        <Container>
          <Input
            label="아이디"
            value={student}
            onChangeText={(text) => setStudent(removeWhitespace(text))}
            onSubmitEditing={() => nameRef.current.focus()}
            placeholder="아이디"
            returnKeyType="next"
          />
          <SelectBox
            label="학과"
            options={major}
            inputPlaceholder="학과"
            value={selectedMajor}
            onChange={onChange()}
            hideInputFilter={false}
          />
          <Input
            label="이름"
            ref={nameRef}
            value={name}
            onChangeText={(text) => setName(removeWhitespace(text))}
            onSubmitEditing={() => nicknameRef.current.focus()}
            placeholder="이름"
            returnKeyType="next"
          />
          <Input
            label="별명"
            ref={nicknameRef}
            value={nickname}
            onChangeText={(text) => setNickname(removeWhitespace(text))}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="별명"
            returnKeyType="next"
          />
          <Input
            label="이메일"
            ref={emailRef}
            value={email}
            onChangeText={(text) => setEmail(removeWhitespace(text))}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="이메일"
            returnKeyType="next"
          />
          <Input
            ref={passwordRef}
            label="비밀번호"
            value={password}
            onChangeText={(text) => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="비밀번호"
            returnKeyType="next"
            isPassword
          />
          <Input
            ref={passwordConfirmRef}
            label="비밀번호확인"
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
            onSubmitEditing={() => {}}
            placeholder="비밀번호확인"
            returnKeyType="done"
            isPassword
          />
          <ErrorText>{errorMessage}</ErrorText>

          <Button
            title="회원가입"
            onPress={_handleSignupButtonPress}
            disabled={disabled}
          />
        </Container>
      </KeyboardAwareScrollView>
    </Containers>
  );
}

export default Signup;
