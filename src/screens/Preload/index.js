import React from 'react'
import { Container, Logo, CustomButton, CustomButtonText, WelcomeText, ButtonContainer } from './styles';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import 'firebase/firestore';
import MCLogo from '../../assets/Logo.png'

export default function Index() {
    const navigation = useNavigation();

    const handleLoginClick = async () => {
        navigation.reset({
            routes: [{ name: 'Login' }]
        });
    }

    const handleSignUpClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}
            <LinearGradient
                // colors={['#21537D', '#56C8B7']}
                colors={['#A5FAEA', '#6EC8F5']}
                style={{
                    position: 'absolute',
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '104%'
                }} />

            <Logo source={MCLogo} />

            <ButtonContainer>
                <CustomButton onPress={handleLoginClick}>
                    <CustomButtonText style={{ color: '#2E3862' }}  >Login</CustomButtonText>
                </CustomButton>
                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText style={{ color: '#2E3862' }} >Register Now</CustomButtonText>
                </CustomButton>
            </ButtonContainer>

            <WelcomeText>Welcome to MataConnect</WelcomeText>
        </Container>
    );
}