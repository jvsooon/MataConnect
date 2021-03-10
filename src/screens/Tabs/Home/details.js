import * as React from 'react'
import { StatusBar } from 'react-native'
import { Container, Title, DetailsCover, DetailEventImg, DateText, DescContainer, DescText } from './styles';
import 'intl';
import 'intl/locale-data/jsonp/en';

const optionsFull = { month: "long", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' };
const optionsDate = { month: "long", day: "numeric", year: "numeric" };

const formatDate = (dtstart) => {
    const fullDate = dtstart.split(' ')
    const dateParts = fullDate[0].split('-')

    if(fullDate.length > 1) {
        const hourParts = fullDate[1].split(':')
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hourParts[0], hourParts[1]);
        return new Intl.DateTimeFormat("en-US", optionsFull).format(date);
    } else {
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        return new Intl.DateTimeFormat("en-US", optionsDate).format(date);
    }
}

export default function details({ route }) {
    const { title, dtstart, description, imgSrc } = route.params;
    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <Title>{title}</Title>
            <DetailsCover>
                <DetailEventImg source={{ uri: imgSrc }} />
            </DetailsCover>
            <DateText>{formatDate(dtstart)}</DateText>
            <DescContainer>
                <DescText>{description}</DescText>
            </DescContainer>
        </Container>
    )
}