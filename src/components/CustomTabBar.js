import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useVisibilityToggler from '../hooks/useVisibilityToggler'

import HomeIcon from '../assets/home.svg';
import MapIcon from '../assets/compass.svg';
import CalendarIcon from '../assets/calendar.svg';
import AccountIcon from '../assets/user.svg';

const TabArea = styled.View`
    position: absolute;
    flex-direction: row;
    width: 90%;
    align-self: center;
    justify-content: space-around;
    margin-bottom: 1%;
`;

const TabItem = styled.TouchableOpacity`
    justify-content: center;
    background-color: #fff;
    shadow-color: #aaa;
    shadow-offset: 0;
    shadow-opacity: 0.5;
    shadow-radius: 6px;
    elevation: 3;
    padding: 2%;
    border-radius: 10px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default function CustomTabBar({ state, navigation }) {
    const [marginSize, setMarginSize] = useState('-1%');
    const goTo = (screenName) => navigation.navigate(screenName);

    const [BottomTabComponent, toggleBottomTab] = useVisibilityToggler(
        <TabArea >
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon width={`${hp('5.4%')}`} height={`${hp('5.4%')}`} />
            </TabItem>

            <TabItem onPress={() => goTo('Maps')}>
                <MapIcon width={`${hp('5.4%')}`} height={`${hp('5.4%')}`} />
            </TabItem>

            <TabItem onPress={() => goTo('Calendar')}>
                <CalendarIcon width={`${hp('5.4%')}`} height={`${hp('5.4%')}`} />
            </TabItem>

            <TabItem onPress={() => goTo('Profile')}>
                <AccountIcon width={`${hp('5%')}`} height={`${hp('5%')}`} />
            </TabItem>
        </TabArea>
        , true);

    useLayoutEffect(() => {
        if (state.routes[state.index].state && state.routes[state.index].state.index != 0) {
            if (state.routes[state.index].state.index > 0) {
                setMarginSize('-1%');
            }
        } else { setMarginSize('10%') }
    }, [state.routes[state.index].state]);

    return (
        <View style={{ bottom: marginSize }}>{BottomTabComponent}</View>
    );
}