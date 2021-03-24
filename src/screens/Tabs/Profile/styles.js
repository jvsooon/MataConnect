import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    flex: 2;
    align-self: center;
`;

export const ProfilePictureWrapper = styled.View`
    margin-top: ${Platform.OS == 'ios' ? '20px' : '40px'};
    height: ${hp('18%')}px;
    width: ${hp('18%')}px;
    border-radius: ${wp('100%')}px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 4.65px;
    shadow-opacity: .27;  
    elevation: 6;
`;

export const ProfilePicture = styled.Image`
    height: ${hp('18%')}px;
    width: ${hp('18%')}px;
    border-radius: ${wp('100%')}px;
`;

export const BlankImage = styled.View`
    height: ${hp('18%')}px;
    width: ${hp('18%')}px;
    border-radius: ${wp('100%')}px;
    background: #ffffff;
`;

export const ProfileName = styled.Text`
    font-weight: 700;
    font-size: ${hp('3%')}px;
    color: #2E3862;
    align-self: center;
`;

export const PencilWrapper = styled.TouchableOpacity`
    position: absolute;
    alignSelf: flex-end
    right: ${Platform.OS == 'ios' ? wp('2%') : wp('2%')}px;
    top: ${Platform.OS == 'ios' ? hp('3%') : hp('6%')}px;
    elevation: ${Platform.OS === 'android' ? 50 : 0};
    zIndex: 1;
`;

export const IconsBox = styled.View`
    flex: 1.8;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
`;

export const IconContainer = styled.TouchableOpacity`
    width:${wp('100%')/3}px; 
    align-items: center;
    margin-vertical: ${hp('2%')}px;
`;
  
export const IconBG = styled.View`
    background-color: #fff;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    width:${hp('12%')}px; 
    height: ${hp('12%')}px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 4.65px;
    shadow-opacity: .27;  
    elevation: 6;
`;

export const IconText = styled.Text`
    font-size: ${hp('1.8%')}px;
    color: #2E3862;
    font-weight: bold;
`;

export const InfoContainer = styled.View`
    flex: .8;
    flex-direction: row;
    justify-content: space-around;
    align-items: center
`;

export const InfoBox = styled.View`
    background-color: #fff;
    width: ${wp('40%')}px;
    height: ${hp('12%')}px;
    border-radius: 20px;
    justify-content: space-around;
    flex-direction: column;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 4.65px;
    shadow-opacity: .27;  
    elevation: 6;
`;

export const InfoTitle = styled.Text`
    font-weight: bold;
    color: #2E3862
    text-align: center;
    font-size: ${hp('2%')}px;
`;

export const InfoContent = styled.View`
    flex-direction: row;
`;
    
export const InfoDisplay = styled.View`
    flex: 1;
`;

export const InfoText = styled.Text`
    font-weight: bold;
    align-self: center
    font-size: ${hp('2.2%')}px;
    color: #2E3862
`;

export const Footer = styled.View`
    flex: .8; 
    margin-bottom: ${hp('10%')}px;
    align-items: center;
    justify-content: center;

`;

export const EditButton = styled.TouchableOpacity`
    height: ${Platform.OS == 'ios' ? hp('4.5%') : hp('5%')}px;
    width: ${wp('90%')}px;
    background-color: #fff;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 30px;
    align-items: center;
    justify-content: center;
    margin-vertical: 10px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 4.65px;
    shadow-opacity: .27;  
    elevation: 4;
`;

export const LogoutButton = styled.TouchableOpacity`
    height: ${Platform.OS == 'ios' ? hp('4.5%') : hp('5%')}px;
    width: ${wp('90%')}px;
    background-color: #fff
    border-top-right-radius: 30px
    border-bottom-right-radius: 0px
    border-top-left-radius: 30px
    border-bottom-left-radius: 30px
    align-items: center;
    justify-content: center;
    margin-vertical: 5px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 4.65px;
    shadow-opacity: .27;  
    elevation: 4;
`;

export const ButtonText = styled.Text`
    font-weight: bold;
    color: #2E3862;
    font-size: ${hp('2.5%')}px;
`;