import React, { useEffect } from "react";
import styled from "styled-components/native";
import { images } from "../utils/images";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import ImagePicker from 'react-native-image-crop-picker';

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;
const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.background};
  width: 120px;
  height: 120px;
  margin-bottom: 50px;
`;
const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled(MaterialIcons).attrs({
  name: "photo",
  size: 30,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;
const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Image = ({
  url,
  imageStyle,
  rounded,
  showButton,
  onChangeImage,
  navigation,
}) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status !== "granted") {
            Alert.alert("Photo Permission", "권한요청을 허용 하시겠습니까?.");
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  const _handleEditButton = async () => {
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [1, 1],
    //     quality: 1,
    //   });

    //   if (!result.cancelled) {
    //     onChangeImage(result.uri);
    //   }
    // } catch (e) {
    //   Alert.alert("Photo Error", e.message);
    // }
    navigation.navigate("FreeBoard");
  };

  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} r />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => {},
};

export default Image;
