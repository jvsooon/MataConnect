import styled from 'styled-components/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    justify-content: center;
    align-items: center
`;

export const Logo = styled.Image`
    height: ${hp('100%')/2}px;
    width: ${hp('100%')/2}px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    `;

export const CustomButton = styled.TouchableOpacity`
    height: ${hp('6%')}px;
    width: 40%;
    background-color: #fff;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    margin-top: ${hp('20%')}px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.4;
    shadow-radius: 2px;
    elevation: 4;
`;

export const CustomButtonText = styled.Text`
    font-size:  ${hp('2.6%')}px;
    font-weight: bold;
`;

export const WelcomeText = styled.Text`
    font-size: ${hp('3.2%')}px;
    font-weight: bold;
    color: #2E3862;
    margin-top: ${hp('6%')}px;
`;

