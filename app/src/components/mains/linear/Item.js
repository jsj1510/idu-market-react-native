import React from "react";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Container = styled.Pressable`
  flex: 1;
  align-content: space-between;
  width: 100%;
  margin-bottom: 6px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.headerBottomColor};
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 0 6px;
`;

const ItemContentBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: ${({ isLeft }) => (isLeft ? "flex-start" : "flex-end")};
  padding: ${({ isLeft }) => (isLeft ? "6px 0 6px 6px" : "6px 6px 6px 0")};
`;

const ItemContentText = styled.Text`
  font-size: 16px;
  padding-left: 5px;
  color: ${({ theme }) => theme.marketFont};
`;

const Item = ({ hitSlop, onPress, itemTitle, nickname, commentCount, hit }) => {
  return (
    <Container hitSlop={hitSlop} onPress={onPress}>
      <ItemTitle>{itemTitle}</ItemTitle>
      <ItemContentBox>
        <ItemContent isLeft={1}>
          <MaterialIcons name="person-outline" size={20} color="black" />
          <ItemContentText>{nickname}</ItemContentText>
        </ItemContent>
        <ItemContent isLeft={0}>
          <FontAwesome5 name="comment-dots" size={20} color="black" />
          <ItemContentText>{commentCount}</ItemContentText>
          <ItemContentText>조회수 {hit}</ItemContentText>
        </ItemContent>
      </ItemContentBox>
    </Container>
  );
};

export default Item;
