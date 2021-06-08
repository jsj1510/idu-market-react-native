import styled, { ThemeContext } from "styled-components/native";
import React, { useContext, useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import AppLoading from "expo-app-loading";

import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import Item from "../../components/markets/Item";

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.actionBackgroundColor};
  padding: 10px 20px 10px 20px;
`;

const PurchaseListItem = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.background};
  height: 120px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const Icon = styled.View`
  position: absolute;
  right: 40px;
  top: 20px;
`;

const Content = styled.Text`
  width: 50%;
  margin-left: 15px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PurchaseList = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const { spinner } = useContext(ProgressContext);

  const theme = useContext(ThemeContext);

  const _purchaseList = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const id = await getItemFromAsync("id");
      const response = await fetch(
        `https://idu-market.shop:9800/api/purchase-list/${id}`,
        config
      );
      const json = await response.json();
      json.success ? setPurchaseList(json.purchaseList) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  if (isReady) {
    return !purchaseList.length ? (
      <Container>
        <PurchaseListItem>
          <Title> 아이두 </Title>
          <Icon>
            <Text style={{ fontSize: 50 }}>📚</Text>
          </Icon>
          <Content>구매한 목록이 없어유 ~</Content>
          <Content>장터를 이용해 보아요.</Content>
        </PurchaseListItem>
      </Container>
    ) : (
      <Container>
        <Text style={{ fontWeight: "bold" }}> 내가 구매한 목록 </Text>
        <FlatList
          keyExtractor={(item) => String(item.boardNum)}
          data={purchaseList}
          renderItem={({ item }) => (
            <Item
              item={item}
              navigation={navigation}
              category={item.categoryName}
              boardNum={item.boardNum}
            />
          )}
          windowSize={3} // 렌더링 되는양을 조절
        />
      </Container>
    );
  }
  return (
    <AppLoading
      startAsync={_purchaseList}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default PurchaseList;
