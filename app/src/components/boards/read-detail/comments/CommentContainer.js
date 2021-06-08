import React, { useState, useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ProgressContext, ReadyContext } from "../../../../contexts";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 0px 10px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.imageButtonBackground};
`;

const InputContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;

  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.headerBottomColor};
`;

const InputComment = styled.TextInput`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  padding-left: 10px;
`;

const InputButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  justify-content: center;
  align-items: center;
  width: 15%;
  margin-left: 10px;
  border-radius: 30px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const CommentContainer = ({ id, category, boardNum }) => {
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);

  const _handleCommentChange = (comment) => {
    setComment(comment);
  };

  const _handleSuccessCommentPost = (json) => {
    readyDispatch.notReady();
    Alert.alert("댓글이 등록되었습니다.");
  };

  const _handleCommentPost = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: id,
          content: comment,
        }),
      };

      let response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
        config
      );

      let json = await response.json();
      json.success ? _handleSuccessCommentPost(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("댓글 등록 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    setDisabled(!comment);
  }, [comment]);

  return (
    <Container>
      <Label>댓글</Label>
      <InputContainer>
        {id ? (
          <>
            <InputComment
              onChangeText={_handleCommentChange}
              placeholder="댓글을 입력해주세요"
              returnKeyType="done"
            />

            <InputButton disabled={disabled} onPress={_handleCommentPost}>
              <MaterialIcons name="send" size={13} color={"#fff"} />
            </InputButton>
          </>
        ) : (
          <>
            <InputComment
              placeholder="로그인 후 댓글을 등록할 수 있습니다."
              returnKeyType="done"
            />

            <InputButton disabled={disabled}>
              <MaterialIcons name="send" size={13} color={"#fff"} />
            </InputButton>
          </>
        )}
      </InputContainer>
    </Container>
  );
};

export default CommentContainer;
