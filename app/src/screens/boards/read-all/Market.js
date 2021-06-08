import React, { useContext, useState, useEffect } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert } from "react-native";

import AppLoding from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";

import { ProgressContext, ReadyContext } from "../../../contexts";
import Item from "../../../components/markets/Item";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

function Board({ route, navigation }) {
  const [boards, setBoards] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const { isReady, readyDispatch } = useContext(ReadyContext);

  const { category } = route.params;

  const _loadBoards = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}`,
        config
      );
      const json = await response.json();
      json.success ? setBoards(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleWritePress = (params) => {
    navigation.navigate("PostWrite", params);
  };

  return isReady ? (
    <Container>
      <FlatList
        keyExtractor={(item) => `${item.num}`}
        data={boards}
        renderItem={({ item }) => (
          <Item
            item={item}
            navigation={navigation}
            category={category}
            boardNum={item.num}
            nickname={item.nickname}
          />
        )}
        windowSize={3} // 렌더링 되는양을 조절
      />
      <FAB
        buttonColor="#e84118"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" />}
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
}

export default Board;
