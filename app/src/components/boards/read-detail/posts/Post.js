import React, { useContext, useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import AppLoading from "expo-app-loading";

import { getItemFromAsync } from "../../../../utils/AsyncStorage";
import { ProgressContext, ReadyContext } from "../../../../contexts";

const Container = styled.View`
  flex: 1;
`;

const LabelBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Label = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
`;

const NameBox = styled.View`
  flex: 1;
  margin-left: 5px;
`;

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
`;

const Subscribe = styled.TouchableOpacity`
  padding: 10px;
`;

const ContentTitle = styled.View`
  padding: 12px;
`;

const Title = styled.Text``;

const Description = styled.Text`
  padding: 10px;
  line-height: 15px;
`;

const Post = ({
  title,
  nickname,
  content,
  inDate,
  profilePath,
  studentId,
  category,
  boardNum,
  isWatchlist,
  id,
}) => {
  const [watchlist, setWatchlist] = useState(isWatchlist);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const theme = useContext(ThemeContext);

  const _handleUpdateWatchlist = () => {
    setWatchlist(true);
    readyDispatch.notReady();
    Alert.alert("관심목록에 등록되었습니다.");
  };

  const _handleUpdateWatchlistDelete = () => {
    setWatchlist(false);
    readyDispatch.notReady();
    Alert.alert("관심목록 취소되었습니다.");
  };

  const _handleWatchlist = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardNum: boardNum,
          categoryName: category,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/watchlist/${id}`,
        config
      );
      const json = await response.json();
      json.success ? _handleUpdateWatchlist(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleWatchlistDelete = async () => {
    try {
      spinner.start();

      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardNum: boardNum,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/watchlist/${id}`,
        config
      );
      const json = await response.json();
      json.success ? _handleUpdateWatchlistDelete(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <LabelBox>
        <Label>
          <MaterialCommunityIcons
            name="face-profile"
            size={52}
            color={theme.profileImageColor}
          />
          <NameBox>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 2 }}>
              {nickname}
            </Text>
            <Text>{studentId}</Text>
          </NameBox>
          {studentId === id ? (
            <>
              <PostBtn>
                <Text style={{ color: "#fff" }}>수정</Text>
              </PostBtn>
              <PostBtn>
                <Text style={{ color: "#fff" }}>삭제</Text>
              </PostBtn>
            </>
          ) : (
            <></>
          )}
          {watchlist ? (
            <Subscribe onPress={_handleWatchlistDelete}>
              <Feather name="heart" size={32} color="red" />
            </Subscribe>
          ) : (
            <Subscribe onPress={_handleWatchlist}>
              <Feather name="heart" size={32} color="gray" />
            </Subscribe>
          )}
        </Label>
      </LabelBox>

      <ContentTitle>
        <Title
          style={{ fontSize: 25, fontFamily: "sans-serif", fontWeight: "bold" }}
        >
          {title}
        </Title>
        <Text style={{ fontSize: 12, color: "gray" }}>{inDate}</Text>
      </ContentTitle>

      <Description>{content}</Description>
    </Container>
  );
};

export default Post;
