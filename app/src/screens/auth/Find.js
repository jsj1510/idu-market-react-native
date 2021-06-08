import React, { useState } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import FindId from "../../components/auth/FindId";
import FindPw from "../../components/auth/FindPw";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const FindItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 3px;
  font-size: 20px;
  margin-top: 20px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const FindTitle = styled.TouchableOpacity`
  padding: 10px 30px 0px 30px;
`;

function Find() {
  const [isFindTitle, setIsFindTitle] = useState(true);

  const _handleFindIdChange = () => {
    setIsFindTitle(true);
  };

  const _handleFindPwChange = () => {
    setIsFindTitle(false);
  };

  return isFindTitle ? (
    <Container>
      <FindItemContainer>
        <FindTitle onPress={_handleFindIdChange}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}>
            아이디 찾기
          </Text>
        </FindTitle>
        <FindTitle onPress={_handleFindPwChange}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ecf0f1" }}>
            비밀번호 찾기
          </Text>
        </FindTitle>
      </FindItemContainer>
      <FindId></FindId>
    </Container>
  ) : (
    <Container>
      <FindItemContainer>
        <FindTitle onPress={_handleFindIdChange}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ecf0f1" }}>
            아이디 찾기
          </Text>
        </FindTitle>
        <FindTitle onPress={_handleFindPwChange}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}>
            비밀번호 찾기
          </Text>
        </FindTitle>
      </FindItemContainer>
      <FindPw></FindPw>
    </Container>
  );
}

export default Find;
