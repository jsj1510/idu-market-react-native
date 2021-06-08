import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text } from "react-native";

const ActionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const SaleList = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
`;

const PurchaseList = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
`;

const WritenMe = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 18px;
  margin-left: 3px;
`;

const ActionButtonContainer = ({ iconSize, navigation }) => {
  const theme = useContext(ThemeContext);

  const _handlePurchaseList = async () => {
    navigation.navigate("PurchaseList");
  };

  const _handleSaleList = async () => {
    navigation.navigate("SaleList");
  };

  const _handleInquiry = async () => {
    navigation.navigate("Inquiry");
  };

  return (
    <ActionContainer>
      <SaleList onPress={_handlePurchaseList}>
        <EvilIcons
          name="cart"
          size={iconSize + 10}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5 }}>구매목록</Text>
      </SaleList>
      <PurchaseList onPress={_handleSaleList}>
        <AntDesign
          name="barcode"
          size={iconSize}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5 }}>판매목록</Text>
      </PurchaseList>
      <WritenMe onPress={_handleInquiry}>
        <MaterialCommunityIcons
          name="account-question"
          size={iconSize}
          color={theme.tabInactiveColor}
        />
        <Text style={{ position: "absolute", bottom: 5, marginRight: 14 }}>
          문의사항
        </Text>
      </WritenMe>
    </ActionContainer>
  );
};

export default ActionButtonContainer;
