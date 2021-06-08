import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import { FlatList } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

import moment from "moment";
import ImageSliderContainer from "../../../components/boards/read-detail/ImageSliderContainer";
import Post from "../../../components/boards/read-detail/posts/Post";
import Item from "../../../components/boards/read-detail/comments/Item";
import CommentContainer from "../../../components/boards/read-detail/comments/CommentContainer";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import { ProgressContext, ReadyContext } from "../../../contexts";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

function DetailView({ route }) {
  const [isReady, setIsReady] = useState(false);
  const [board, setBoard] = useState("");
  const [images, setImages] = useState([]);
  const [comments, setCommnets] = useState();
  const [isId, setIsId] = useState("");
  const [isWatchlist, setIsWatchlist] = useState("");
  const [hit, setHit] = useState(hit);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const { category } = route.params;
  const { boardNum } = route.params;

  const _loadDetailView = async () => {
    try {
      spinner.start();

      const id = await getItemFromAsync("id");
      setIsId(id);

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}/${id}`,
        config
      );
      const json = await response.json();

      if (json.success) {
        setImages([...images, ...json.images]);
        setBoard(json.board);
        setCommnets(json.comments);
        setIsWatchlist(json.isWatchList);

        readyDispatch.notReady();
      } else {
        Alert.alert(json.msg);
      }
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
    try {
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hit: hit,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
        config
      );

      const json = await response.json();
      json.success ? setHit(json.hit) : Alert.alert(json.msg);
    } catch (e) {
    } finally {
    }
  };

  const detailViewInfo = () => {
    const content = board.content
      .replace(/<(\/span|span)([^>]*)>/gi, "")
      .replace(/<(\/strong|strong)([^>]*)>/gi, "")
      .replace(/<(\/p|p)([^>]*)>/gi, "\n")
      .replace(/<(\/br|br)([^>]*)>/gi, "\n")
      .replace(/<(\/em|em)([^>]*)>/gi, "")
      .replace(/<(\/u|u)([^>]*)>/gi, "")
      .replace(/<(\/blockquote|blockquote)([^>]*)>/gi, "")
      .replace(/<(\/s|s)([^>]*)>/gi, "");
    // replace(/(<([^>]+)>)/ig,"");
    return (
      <Post
        title={board.title}
        nickname={board.nickname}
        content={content}
        inDate={board.inDate}
        profilePath={board.profilePath}
        studentId={board.studentId}
        category={category}
        boardNum={boardNum}
        isWatchlist={isWatchlist}
        id={isId}
      />
    );
  };

  return isReady ? (
    <KeyboardAwareScrollView>
      <Container>
        <ImageSliderContainer images={images} />
        <>{detailViewInfo()}</>
        <CommentContainer id={isId} category={category} boardNum={boardNum} />
        <FlatList
          keyExtractor={(item) => `${item.num}`}
          data={comments}
          renderItem={({ item }) => (
            <Item
              item={item}
              id={isId}
              category={category}
              boardNum={boardNum}
            />
          )}
          windowSize={3} //렌더링 되는양을 조절
        />
      </Container>
    </KeyboardAwareScrollView>
  ) : (
    <AppLoading
      startAsync={_loadDetailView}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default DetailView;
