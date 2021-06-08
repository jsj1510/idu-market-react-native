import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Container = styled.View`
  margin-vertical: 8;
  background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 5px 10px 15px 10px;
  flex-direction: row;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;
const ItemRowContainer = styled.View`
  flex: 1;
  padding-top: 5px;
  flex-direction: row;
  width: 100%;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 20px;
  font-weight: 600;
`;
const ItemComment = styled.Text`
  padding-left: 5px;
  color: ${({ theme }) => theme.listTime};
`;
const ItemStudent = styled.Text`
  padding-left: 3px;
`;
const StatusText = styled.Text`
  padding-top: 5px;
  margin-left: auto;
  font-size: 16px;
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  position: absolute;
  right: 0px;
  padding-top: 20px;
`;
const ImageContanier = styled.Image`
  width: 120px;
  height: 140px;
  border-radius: 10px;
`;

const Item = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ item, navigation, nickname, category, boardNum }) => {
    const theme = useContext(ThemeContext);

    const changeStatus = ({ item }) => {
      if (item.status === 0) return "판매중";
      if (item.status === 1) return "예약중";
      if (item.status === 2) return "판매완료";
    };

    const _handleDetailViewPress = () => {
      navigation.navigate("DetailView", {
        boardNum: `${boardNum}`,
        category: `${category}`,
      });
    };

    return (
      <Container>
        <ItemContainer onPress={_handleDetailViewPress}>
          <ImageContanier source={{ uri: item.thumbnail }} resizeMode="cover" />
          <ItemTextContainer>
            <ItemRowContainer>
              <ItemTitle>{item.title}</ItemTitle>
              <StatusText>{changeStatus({ item })}</StatusText>
            </ItemRowContainer>
            <ItemRowContainer>
              <MaterialIcons name="person" size={24} color={theme.listIcon} />
              <ItemStudent>{nickname}</ItemStudent>
            </ItemRowContainer>
            <ItemRowContainer>
              <MaterialIcons name="payment" size={25} />
              <ItemStudent>{item.price}원</ItemStudent>
            </ItemRowContainer>
            <ItemRowContainer>
              <FontAwesome5 name="comment-dots" size={22} color="black" />
              <ItemComment>{item.commentCount}</ItemComment>
              <ItemStudent>조회수 {item.hit}</ItemStudent>
              <ItemTime>{item.inDate}</ItemTime>
            </ItemRowContainer>
          </ItemTextContainer>
        </ItemContainer>
      </Container>
    );
  }
);

export default Item;
