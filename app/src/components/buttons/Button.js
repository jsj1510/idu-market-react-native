import React from 'react';
import styled from 'styled-components/native';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) =>
    isFilled ? theme.boardsButton : TRANSPARENT};
  align-items: center;
  border-radius: 4px;
  width:  80%;
  padding: 10px;
  margin-top: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: ${({ theme, isFilled }) => 
        isFilled? theme.buttonTitle : theme.buttonUnfilledTitle};
`;


function Button({ containerStyle, title, onPress, isFilled, disabled }) {
    return (
        <Container 
            style={containerStyle} 
            onPress= {onPress} 
            isFilled={isFilled}
            disabled={disabled}
            >
            <Title isFilled={isFilled}>{title}</Title>           
        </Container>
    )
}

Button.defaultProps = {
    isFilled: true,
}

export default Button