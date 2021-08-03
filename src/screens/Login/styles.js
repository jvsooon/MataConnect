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
    margin-horizontal: ${wp('6%')}px;
    border-radius: 10px;
    height: ${hp('52%')}px;
`;

export const HeaderContainer = styled.View`
    margin-top: 2%;
`;

//font-sizt was 24px 
export const HeaderText = styled.Text`
    font-weight: bold;
    font-size: ${hp('4%')}px;
    text-align: center;
`;

//font size was 14px
export const HeaderSubText = styled.Text`
    color: #aaa;
    font-size: ${hp('2.4%')}px;
    text-align: center;
    font-weight: bold
`;

export const InputArea = styled.View`
    width: 100%
    padding: 30px;
    align-items: center;
    margin-top: -4%;
`;

export const ForgotMsgBtn = styled.View`
    align-self: flex-end;
    margin-top: ${Platform.OS === 'ios' ? `${hp('-1.6%')}px` : `${hp('-2%')}px`};
    margin-bottom: ${hp('2%')}px;
`;

//font size was 16px
export const ForgotMsgBtnText = styled.Text`
    color: #aaa;
    font-size: ${hp('2.2%')}px;
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

//relative and -8 bottom i think
export const FooterMessageButton = styled.TouchableOpacity`
    
`;

export const FooterMessageButtonText = styled.Text`
    font-size: ${hp('2.4%')}px;
    font-weight: bold;
    color: #268596;
`;