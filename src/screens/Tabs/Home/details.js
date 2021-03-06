import * as React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Container, Title, DetailsCover, DetailEventImg, DateText, DescContainer, DescText } from './styles';
import 'intl';
import 'intl/locale-data/jsonp/en';
import ReadMore from 'react-native-read-more-text';

const options = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };

const formatDate = (dtstart) => {
    const fullDate = dtstart.split(' ')
    const dateParts = fullDate[0].split('-')
    const hourParts = fullDate[1].split(':')
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
    const formatedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formatedDate;
}

export default function details({ route }) {
    const { title, date, description, imgSrc } = route.params;
    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <Title>{title}</Title>
            <DetailsCover>
                <DetailEventImg source={{ uri: imgSrc }} />
            </DetailsCover>
            <DateText>{formatDate(date)}</DateText>
            <DescContainer>
                  <Text>{description}</Text>
            </DescContainer>
        </Container>
    )
}
