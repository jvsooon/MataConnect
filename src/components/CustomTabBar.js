import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #ddd;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 35px;
    border: 3px solid #21537D;
    margin-top: -10px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default function CustomTabBar({ state, navigation }) {
    const { state: user } = useContext(UserContext);
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.5 }} width='24' height='24' fill='#21537D' />
            </TabItem>
            <TabItem onPress={() => goTo('Search')}>
                <SearchIcon style={{ opacity: state.index === 1 ? 1 : 0.5 }} width='24' height='24' fill='#21537D' />
            </TabItem>
            <TabItemCenter onPress={() => goTo('Appointments')}>
                <TodayIcon width='30' height='30' fill='#21537D'/>
            </TabItemCenter>
            <TabItem onPress={() => goTo('Favorites')}>
                <FavoriteIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} width='24' height='24' fill='#21537D' />
            </TabItem>
            <TabItem onPress={() => goTo('Profile')}>
                {user.avatar != '' ?
                    <AccountIcon source={{ url: user.avatar }} style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='24' height='24' fill='#21537D'/>
                    :
                    <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='24' height='24' fill='#21537D' />
                }
            </TabItem>
        </TabArea>
    );
}
