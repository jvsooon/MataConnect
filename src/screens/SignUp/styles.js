import styled from 'styled-components/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const Container = styled.SafeAreaView`
    background-color: #e5e5e5;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`
    height: ${hp('30%')}px;
    width: ${hp('30%')}px;
`;

export const FormContainer = styled.SafeAreaView`
    background-color: #fff;
    margin-horizontal: 20px;
    border-radius: 10px;
    height:  ${hp('56%')}px;
`;

export const Header = styled.Text`
    color: #000;
    font-size: ${hp('4%')}px;
    text-align: center;
    font-weight: bold;
    margin-top: 2%;
`;

export const InputArea = styled.View`
    width: 100% 
    padding: 30px;
    align-items: center;
    margin-top: -4%;
`;

export const SocialText = styled.Text`
    font-size: ${hp('2.4%')}px;
    color: #aaa;
    font-weight: bold;
`;

export const SocialHeader = styled.Text`
    text-align: center;
    margin-top: ${hp('-4%')}px;
    fontSize: ${hp('2.3%')}px;
    color: #aaa;
    fontWeight: bold;
`;

export const SocialContainer = styled.View`
    justify-content: center;
    flex-direction: row;  
`;

export const FooterContainer = styled.View`
    flex-direction: row;
    margin-top: 6%;
`;

export const FooterText = styled.Text`
    font-size: ${hp('2.4%')}px;
`;

export const FooterMessageButton = styled.TouchableOpacity`
    
`;

export const FooterMessageButtonText = styled.Text`
    font-size: ${hp('2.4%')}px;
    font-weight: bold;
    color: #268596;
`;