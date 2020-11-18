import React, { useEffect, useContext } from 'react'
import { Container, LoadingIcon, CustomButton, CustomButtonText, WelcomeText, ButtonContainer } from './styles';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../../../firebase'
import 'firebase/firestore';

import BarberLogo from '../../assets/barber.svg';
import AudioWave from '../../assets/audio-waves.svg';
import Api from '../../Api';


export default function Index() {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();



    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await AsyncStorage.getItem('token');
    //         if (token !== null) {
    //             let res = await Api.checkToken(token);

    //             if (res.token) {
    //                 await AsyncStorage.setItem('token', res.token);

    //                 userDispatch({
    //                     type: 'setAvatar',
    //                     payload: {
    //                         avatar: res.data.avatar
    //                     }
    //                 });

    //                 navigation.reset({
    //                     routes: [{ name: 'MainTab' }]
    //                 });
    //             } else {
    //                 navigation.navigate('SignIn');
    //             }

    //         } else {
    //             navigation.navigate('SignIn');
    //         }
    //     }
    //     checkToken();
    // }, []);

    const handleLoginClick = async () => {
        navigation.reset({
            routes: [{ name: 'Login' }]
        });

        // not realtime
        // const userDocument = await firebase.firestore().collection('users').
        // doc('DcNA3GckZp3OYNffdiUt').get()

        // const subscriber = await firebase.firestore().collection('users').
        // doc('DcNA3GckZp3OYNffdiUt').onSnapshot(doc => console.log(doc.data().name))
        // console.log(userDocument)
    }

    const handleSignUpClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    return (
        <Container>
            <StatusBar barStyle={'default'} />
            {/* <LoadingIcon size='large' color='#FFFFFF' /> */}
            <LinearGradient
                colors={['#21537D', '#56C8B7']}
                // colors={['#14366f', '#63e5c5']}
                style={{
                    position: 'absolute',
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '104%',
                }} />

            <AudioWave style={{ marginTop: '25%' }} width='100%' height='26%' />

            <ButtonContainer>
                <CustomButton onPress={handleLoginClick}>
                    <CustomButtonText style={{ color: '#56C8B7' }}  >Login</CustomButtonText>
                </CustomButton>
                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText style={{ color: '#21537D' }} >Register Now</CustomButtonText>
                </CustomButton>
            </ButtonContainer>

            <WelcomeText>Welcome to MataConnect</WelcomeText>
        </Container>
    );
}