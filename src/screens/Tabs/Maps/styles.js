import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SearchBox = styled.View`
    background-color: #fff;    
    position: absolute;
    width: ${wp('92%')}px;
    align-self: center;
    margin-top: ${hp('4%')}px;
    border-radius: 10px;
    padding: ${hp('1%')}px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 6;
    flex-direction: row;
`;

export const LocationIcon = styled.View`
    position: absolute;
    background-color: #fff;
    padding: 14px;
    border-radius: 30px;
    top: ${Platform.OS == 'ios' ? `${hp('72%')}px` : `${hp('60%')}`};
    left: ${Platform.OS == 'ios' ? `${wp('90%')}px` : `${wp('84%')}px`};
    
`;

export const CloseButtonBox = styled.TouchableOpacity`    
    background-color: #d9d8d6;
    border-radius: 30px;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    margin-top: 2.6%;
`;

export const Card = styled.View`
    background-color: yellow; 
    height: 100%;
    padding: 10px;
    
`;
// border-radius: 10px;
//     shadow-color: #000;
//     shadow-offset: 2px;
//     shadow-opacity: 0.25;
//     shadow-radius: 3.84px;
//     elevation: 5;



export const Header = styled.View`
   
    padding-vertical: 10px;
`;
// shadow-color: #333;
//     shadow-offset: -1px;
//     shadow-radius: 2px;
//     shadow-opacity: 4;

export const PanelHandle = styled.View`
    background-color: #C1BFC2;
    height: 8px;
    border-radius: 10px;
    margin-horizontal: 44%;
`;

export const CardTitle = styled.Text`
    font-weight: bold;
    font-size: ${hp('2.4%')}px;
`;