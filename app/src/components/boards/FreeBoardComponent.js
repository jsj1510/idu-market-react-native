import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const ItemStudent = styled.Text`
  font-size: 12px;
  padding-left: 3px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
`;

const ItemDescription = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemRowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const ItemComment = styled.Text`
  padding-left: 5px;
  color: ${({ theme }) => theme.listTime};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  position: absolute;
  right: 0px;
  padding-top: 40px;
`;

const ItemHit = styled.Text`
  position: absolute;
  right: 0px;
`;

const Item = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ item, navigation }) => {
    // const [hit, setHit] = useState(hit);
    const theme = useContext(ThemeContext);

    // const _hitPatch = async () => {
    //   try {
    //     const config = {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         hit: hit,
    //       }),
    //     };

    //     const response = await fetch(
    //       `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
    //       config
    //     );

    //     const json = await response.json();
    //     console.log(json);
    //     json.success ? setHit(json.hit) : Alert.alert(json.msg);
    //   } catch (e) {
    //   } finally {
    //   }
    // };

    const _handleDetailViewPress = () => {
      // _hitPatch();
      navigation.navigate("DetailView", {
        boardNum: `${item.num}`,
        category: `free`,
      });
    };

    return (
      <ItemContainer onPress={_handleDetailViewPress}>
        <ItemTextContainer>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemRowContainer>
            <MaterialIcons name="person" size={24} color={theme.listIcon} />
            <ItemStudent>{item.nickname}</ItemStudent>
          </ItemRowContainer>
          <ItemDescription>{item.content}</ItemDescription>
        </ItemTextContainer>
        <ItemRowContainer>
          <FontAwesome5 name="comment-dots" size={22} color="black" />
          <ItemComment>{item.commentCount}</ItemComment>
          <ItemTime>{item.inDate}</ItemTime>
          <ItemHit>조회수 {item.hit}</ItemHit>
        </ItemRowContainer>
      </ItemContainer>
    );
  }
);

export default Item;
