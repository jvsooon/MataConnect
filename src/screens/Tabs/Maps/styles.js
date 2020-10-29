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
    top: ${hp('80%')}px;
    left: ${Platform.OS == 'ios' ? `${wp('40%')}px` : `${wp('34%')}px`};
    
`;

export const Card = styled.View`
    background-color: #fff;
    height: 100%;
    margin-horizontal: ${wp('4%')}px;
    border-radius: 10px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
    padding: ${hp('1.6%')}px;
    margin-bottom: ${hp('-3.2%')}px;
    margin-top: ${Platform.OS == 'ios' ? `${hp('2%')}px` : 0};
    
`;

export const CardTitle = styled.Text`
    font-weight: bold;
    font-size: ${hp('2.4%')}px;
`;

export const Header = styled.View`
    background-color: #fff;
    shadow-color: #333;
    shadow-offset: -1px;
    shadow-radius: 2px;
    shadow-opacity: 4;
    padding-top: 20px;
    margin-horizontal: 10px;
`;

export const PanelHeader = styled.View`
    align-items: center;
`;

export const PanelHandle = styled.View`
    background-color: #fff;
    margin-horizontal: 10px;
    border-radius: 10px;
`;