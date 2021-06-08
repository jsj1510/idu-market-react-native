import React, { useContext, useState, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import SelectBox from "react-native-multi-selectbox";

import {
  validateEmail,
  removeWhitespace,
  checkNickname,
} from "../../utils/common";
import { Input } from "../../components";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import { ProgressContext, ReadyContext } from "../../contexts";
import majors from "../../utils/majors";

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const Title = styled.View`
  align-items: center;
  width: 100%;
`;

const UpdateButonContainer = styled.View`
  align-items: flex-end;
  width: 100%;
  padding-right: 10px;
`;

const ProfileUpdateButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  align-items: center;
  border-radius: 4px;
  padding: 5px;
  margin-right: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const MajorChoice = styled.Text`
  padding-top: 10px;
  color: ${({ theme }) => theme.errorText};
`;

const Item = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UpdateButton = styled.TouchableOpacity`
  padding: 30px 10px 5px 5px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ProfileUpdateInfo = ({ isNickname, isEmail, major, navigation }) => {
  const [nickname, setIsNickname] = useState(isNickname);
  const [email, setIsEmail] = useState(isEmail);
  const [emailUpdate, setEmailUpdate] = useState(true);
  const [nicknameUpdate, setNicknameUpdate] = useState(true);
  const [selectedMajor, setSelectedMajor] = useState(major);
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const didmountRef = useRef();

  const _handleEmailUpdadteButton = () => {
    setEmailUpdate(false);
  };

  const _handleNicknameUpdadteButton = () => {
    setNicknameUpdate(false);
  };

  const _handleNickname = (nickname) => {
    setIsNickname(removeWhitespace(nickname));
  };

  const _handleEmail = (email) => {
    setIsEmail(removeWhitespace(email));
  };

  const _handleUpdateSucess = (json) => {
    Alert.alert(json.msg);
  };

  const _ProfileUpdadte = async () => {
    try {
      spinner.start();
      const id = await getItemFromAsync("id");

      const profileUpdateInfo = {
        email: email,
        nickname: nickname,
        majorNum: parseInt(selectedMajor.value),
      };

      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileUpdateInfo),
      };
      console.log(profileUpdateInfo);
      const response = await fetch(
        `https://idu-market.shop:9800/api/students/${id}`,
        config
      );
      const json = await response.json();
      console.log(json);
      json.success ? _handleUpdateSucess(json) : Alert.alert(json.msg);
      readyDispatch.notReady();
    } catch (e) {
    } finally {
      spinner.stop();
    }
    navigation.navigate("Main");
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!checkNickname(nickname)) {
        _errorMessage = "별명은 최대 8글자입니다 (모음,자음 불가)";
      } else if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 지켜주세요";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [nickname, email]);

  useEffect(() => {
    setDisabled(!(nickname && email && !errorMessage));
  }, [nickname, email, errorMessage]);

  function onChange() {
    return (el) => setSelectedMajor(el);
  }

  return (
    <Container>
      <Title>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>프로필 수정</Text>
      </Title>

      {selectedMajor.value ? (
        <UpdateButonContainer>
          <ProfileUpdateButton onPress={_ProfileUpdadte} disabled={disabled}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
              수정
            </Text>
          </ProfileUpdateButton>
        </UpdateButonContainer>
      ) : (
        <UpdateButonContainer>
          <MajorChoice>학과를 선택하세요</MajorChoice>
        </UpdateButonContainer>
      )}

      {nicknameUpdate ? (
        <Item>
          <Input
            label="닉네임"
            value={isNickname}
            placeholder={nickname}
            disabled
          />
          <UpdateButton onPress={_handleNicknameUpdadteButton}>
            <FontAwesome5 name="pencil-alt" size={35} color="black" />
          </UpdateButton>
        </Item>
      ) : (
        <Input
          label="닉네임"
          value={nickname}
          onChangeText={_handleNickname}
          placeholder={isNickname}
        />
      )}

      {emailUpdate ? (
        <Item>
          <Input label="이메일" value={isEmail} placeholder={email} disabled />
          <UpdateButton onPress={_handleEmailUpdadteButton}>
            <FontAwesome5 name="pencil-alt" size={35} color="black" />
          </UpdateButton>
        </Item>
      ) : (
        <Input
          label="이메일"
          value={email}
          onChangeText={_handleEmail}
          placeholder={isEmail}
        />
      )}

      <SelectBox
        label="학과"
        options={majors}
        inputPlaceholder="학과"
        value={selectedMajor}
        onChange={onChange()}
        hideInputFilter={false}
      />
      <ErrorText>{errorMessage}</ErrorText>
    </Container>
  );
};

export default ProfileUpdateInfo;
