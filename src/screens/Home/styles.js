import styled from 'styled-components/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const Container = styled.SafeAreaView`
    flex: 1; 
    justify-content: center; 
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
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.4;
    shadow-radius: 2px;
    elevation: 5;
`;

export const CustomButtonText = styled.Text`
    font-size:  ${hp('2.6%')}px;
    font-weight: bold;
`;