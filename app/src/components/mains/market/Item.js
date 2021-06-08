import React from "react";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Container = styled.Pressable`
  flex: 1;
  margin-right: 20px;
  width: 150px;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 100px;
  width: 100%;
  border-radius: 12px;
  border-width: 1px;
  border-color: gray;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0 0 3px;
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 3px 0 0 3px;
`;

const ItemContentText = styled.Text`
  font-size: 16px;
  padding: 3px;
  color: ${({ theme }) => theme.marketFont};
`;

const Hit = styled.Text`
  position: absolute;
  right: 5px;
`;

const Item = ({
  hitSlop,
  onPress,
  imgUrl,
  itemTitle,
  nickname,
  commentCount,
  hit,
}) => {
  return (
    <Container hitSlop={hitSlop} onPress={onPress}>
      <StyledImage source={{ uri: imgUrl }} />
      <ItemTitle>{itemTitle}</ItemTitle>
      <ItemContent>
        <MaterialIcons name="person-outline" size={16} color="black" />
        <ItemContentText>{nickname}</ItemContentText>
      </ItemContent>
      <ItemContent>
        <FontAwesome5 name="comment-dots" size={16} color="black" />
        <ItemContentText>{commentCount}</ItemContentText>
        <Hit>조회수 {hit}</Hit>
      </ItemContent>
    </Container>
  );
};

export default Item;
