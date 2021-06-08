import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 300;
  background-color: black;
`;

const ImageSliderContainer = ({ images }) => {
  return (
    <Container>
      <SliderBox
        circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
        resizeMode="contain" // 이미지 사이즈 조절값
        images={images} // 이미지 주소 리스트
        sliderBoxHeight="100%"
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        imageLoadingColor="#2196F3"
      />
    </Container>
  );
};

export default ImageSliderContainer;
