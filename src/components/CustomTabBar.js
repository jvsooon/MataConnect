import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { UserContext } from '../contexts/UserContext';

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
    const [marginSize, setMarginSize] = useState(10);
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    useLayoutEffect(() => {
        // console.log(state.routes[state.index].name)

        if (state.routes[state.index].state && state.routes[state.index].state.index != 0) {
            // if (state.routes[state.index].state.index > 0) {
                // console.log(state.routes[state.index].state)
                //    navigation.setOptions({ hideTabBar: true});
                setMarginSize('-10%');
            // }
        }
        else {setMarginSize(10);}
    }, [state]);

    return (
        <TabArea style={{ bottom: marginSize }}>
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
            {/* <TabItem onPress={() => goTo('Profile')}>
                {user.avatar != '' ?
                    <AccountIcon source={{ url: user.avatar }} style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='24' height='24' fill='#21537D'/>
                    :
                    <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='24' height='24' fill='#21537D' />
                }
            </TabItem> */}
        </TabArea>
    );
}
