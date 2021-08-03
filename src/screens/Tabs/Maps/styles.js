import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Header = styled.View`
    padding-vertical: 10px;
`;

export const PanelHandle = styled.View`
    background-color: #C1BFC2;
    height: 8px;
    border-radius: 10px;
    margin-horizontal: 44%;
`;

export const Card = styled.View`
    background-color: #fff; 
    height: 200px;
    width: 300px;
    margin-horizontal: 10px;
    border-radius: 10px;
    padding: 15px;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-radius: 5px;
    shadow-opacity: .3;  
    elevation: 5;  
`;

export const CardHeader = styled.View`
    flex-direction: row;
`;

export const CardCover = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: ${Platform.OS == 'ios' ? '10px' : '20px'};
    resize-mode: contain;
`;

export const CardOptions = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const CardFooter = styled.View`
    margin-top: 10px;
    flex-direction: row;
`;

export const EventInfo = styled.View`
    flex: 5.4;
`;

export const CardTitle = styled.Text`
    font-weight: bold;
    font-size: ${hp('2.4%')}px;
`;

export const CardSubTitle = styled.Text`
    font-size: 16px;
`;

export const IconBox = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const IconText = styled.Text`
    font-size:  14px;
    font-weight: bold;
    margin: 6px;
`;