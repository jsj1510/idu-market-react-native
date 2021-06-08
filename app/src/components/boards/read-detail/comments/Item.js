import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { ProgressContext, ReadyContext } from "../../../../contexts";

const ReplyContainer = styled.View`
  padding-left: 25px;
  background-color: ${({ theme }) => theme.inputDisabledBackground};
`;
const ReplyIcon = styled.View`
  position: absolute;
  top: 20px;
  left: 5px;
`;

const CommentItems = styled.View`
  padding: 10px 10px;
  border-bottom-width: 1px;
  width: 100%;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
`;

const ProfileImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 26px;
  width: 26px;
  margin: 0 4px 0 4px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.boardsButton};
`;

const CommentLabel = styled.View`
  padding-top: 5px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CommentDescription = styled.Text`
  width: 100%;
  padding: 3px;
`;

const CommentId = styled.Text`
  color: ${({ theme }) => theme.commentIdColor};
`;

const TimeBox = styled.View`
  flex: 1;
  align-items: flex-end;
  width: 100%;
  padding-right: 12px;
`;

const Time = styled.Text`
  color: ${({ theme }) => theme.commentIdColor};
`;

// const ReplyButton = styled.Pressable.attrs({
//   hitSlop: 10,
// })`
//   align-self: flex-end;
//   align-items: center;
//   width: 18%;
//   padding: 3px;
//   margin-top: 6px;
//   color: ${({ theme }) => theme.background};
//   background-color: ${({ theme }) => theme.boardsButton};
//   border-radius: 12px;
// `;

// const ReplyText = styled.Text`
//   color: ${({ theme }) => theme.background};
//   padding: 3px;
// `;

const ReplyInput = styled.View`
  flex-direction: row;
  padding: 10px 0px;
`;

const InputComment = styled.TextInput`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  margin-left: 5px;
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

const Item = React.memo(({ item, id, category, boardNum }) => {
  const [reply, setReply] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);

  const _handleReplyChange = (reply) => {
    setReply(reply);
  };
  const content = item.content
    .replace(/<p>/g, "")
    .replace(/<br \/>/g, "\n")
    .replace(/<\/p>/g, "\n");

  const _handleSuccessCommentPost = (json) => {
    readyDispatch.notReady();
    Alert.alert("댓글이 등록되었습니다.");
  };

  const _handleReplyPost = async () => {
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
          content: reply,
        }),
      };

      let response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}/${item.groupNum}`,
        config
      );

      let json = await response.json();
      json.success ? _handleSuccessCommentPost(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("답글 등록 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    setDisabled(!reply);
  }, [reply]);

  return item.depth === 1 ? (
    <ReplyContainer>
      <ReplyIcon>
        <Ionicons name="return-down-forward-outline" size={24} color="black" />
      </ReplyIcon>
      <CommentItems>
        <CommentLabel>
          <ProfileImage
            source={{
              uri: "https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/1.png",
            }}
          />
          <CommentId>{item.nickname}</CommentId>
          <TimeBox>
            <Time>{item.inDate}</Time>
          </TimeBox>
        </CommentLabel>

        <CommentDescription>{content}</CommentDescription>
      </CommentItems>
    </ReplyContainer>
  ) : (
    <>
      <CommentItems>
        <CommentLabel>
          <ProfileImage
            source={{
              uri: "https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/1.png",
            }}
          />
          <CommentId>{item.nickname}</CommentId>
          <TimeBox>
            <Time>{item.inDate}</Time>
          </TimeBox>
        </CommentLabel>
        <CommentDescription>{content}</CommentDescription>
      </CommentItems>
      {id ? (
        <>
          <ReplyInput>
            <InputComment
              onChangeText={_handleReplyChange}
              placeholder="답글을 입력해주세요"
              returnKeyType="done"
            />
            <InputButton onPress={_handleReplyPost} disabled={disabled}>
              <MaterialIcons name="send" size={13} color={"#fff"} />
            </InputButton>
          </ReplyInput>
        </>
      ) : (
        <>
          <ReplyInput>
            <InputComment
              placeholder="로그인 후 답글 등록 가능합니다."
              returnKeyType="done"
            />
            <InputButton disabled={disabled}>
              <MaterialIcons name="send" size={13} color={"#fff"} />
            </InputButton>
          </ReplyInput>
        </>
      )}
    </>
  );
});

export default Item;
