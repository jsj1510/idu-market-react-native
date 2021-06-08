import React, { useContext, useState, useRef, useEffect } from "react";
import { Alert, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  position: absolute;
  right: 20px;
  margin-top: 20px;
  padding: 5px;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Title = styled.TextInput`
  border-bottom-width: 1px;
  width: 100%;
  font-size: 20px;
  margin-top: 30px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const Content = styled.TextInput`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-top: 40px;
  padding-bottom: 10px;
  flex: 1;
  width: 100%;
`;

const Explain = styled.Text`
  border: 1px;
  padding: 30px;
  border-color: ${({ theme }) => theme.listBorder};
  background-color: ${({ theme }) => theme.actionBackgroundColor};
  font-size: 12px;
`;

function Inquery({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(true);

  const contentRef = useRef();

  const { spinner } = useContext(ProgressContext);

  const _handleSuccessInquiryPost = (json) => {
    Alert.alert(json.msg);
  };

  const _handlePostBtnPress = async () => {
    try {
      spinner.start();

      const id = await getItemFromAsync("id");

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: id,
          title: title,
          content: content,
        }),
      };

      let response = await fetch(
        "https://idu-market.shop:9800/api/inquiry",
        config
      );
      let json = await response.json();

      json.success ? _handleSuccessInquiryPost(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
    navigation.navigate("Main");
  };

  useEffect(() => {
    setDisabled(!(title && content));
  }, [title, content]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <PostBtn onPress={_handlePostBtnPress} disabled={disabled}>
          <Text style={{ color: "#fff" }}> 전송 </Text>
        </PostBtn>
        <Title
          onChangeText={(text) => setTitle(text)}
          placeholder="문의 사항"
          returnKeyType="next"
          onSubmitEditing={() => contentRef.current.focus()}
        />
        <Content
          multiline
          ref={contentRef}
          onChangeText={(text) => setContent(text)}
          placeholder="내용을 입력해주세요"
          returnKeyType="done"
        />
        <Explain>
          문의하신 사항은 wooahan agile 메일로 전송되며 해당 아이디에 등록된
          이메일로 답장이 전송됩니다.
        </Explain>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Inquery;
