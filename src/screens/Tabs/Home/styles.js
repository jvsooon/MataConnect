import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const ListHeader = styled.Text`
    font-weight: bold;
    font-size: ${hp('2.7%')}px;
    margin-vertical: ${hp('2%')}px;
    margin-left: ${wp('6.5%')}px;
    color: #2E3862;
`;

export const NoEventsHeader = styled.Text`
    font-size: ${hp('2.6%')}px;
    font-weight: bold;
    margin-vertical: ${hp("8%")}px;
`;

export const Box = styled.View``;

export const JobImg = styled.Image`
    width: ${hp('14%')}px;
    height: ${hp('14%')}px;
    margin-vertical: ${hp('3%')}px;
    margin-right: ${wp('3%')}px;
`;

export const Cover = styled.TouchableOpacity`
    margin-top: ${hp('3%')}px;
    margin-left: ${wp('2%')}px;
    width: ${hp('12.5%')}px;
    height: ${hp('12.5%')}px;
    border-radius: 20px;
    align-self: center;
    elevation: 6;
    shadow-color: #000;
    shadow-offset: 0px;
    shadow-opacity: 0.27;
    shadow-radius: 4.65px;
    margin-right: ${wp('4%')}px;
`;

export const EventImg = styled.Image`
    width: ${hp('12.5%')}px;
    height: ${hp('12.5%')}px;
    border-radius: 20px;
`;


export const Title = styled.Text`
    margin-top: 12px;
    font-weight: bold;
    color: #e12d57;
    font-size: ${Platform.OS == 'ios' ? hp('3%') : hp('2.6%')}px;
    text-align: center;
`;

export const DetailsCover = styled.View`
    width: ${hp('30%')}px;
    height: ${hp('30%')}px;
    margin-vertical: ${hp('3%')}px;
    border-radius: 10px;
    align-self: center;
    elevation: 6;
    shadow-color: #000;
    shadow-offset: 2px;
    shadow-opacity: 0.27;
    shadow-radius: 4.65px;
`;

export const DetailEventImg = styled.Image`
    width: ${hp('30%')}px;
    height: ${hp('30%')}px;
    border-radius: 10px;
`;

export const DateText = styled.Text`
    font-size: ${hp('2.4%')}px;
    margin-horizontal: ${wp('6%')}px;
    margin-vertical: ${hp('.5%')}px;
`;

export const DescContainer = styled.ScrollView`
    margin-bottom: ${hp('5%')}px;
`;

export const DescText = styled.Text`
    font-size: ${hp('2.4%')}px;
    margin-horizontal: ${wp('6%')}px;
    margin-vertical: ${hp('.5%')}px;
`;