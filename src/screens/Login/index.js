import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, StatusBar, LogBox, ImageBackground } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import {
    Container, Logo, FormContainer, InputArea, FooterContainer, FooterMessageButton, FooterMessageButtonText, SocialContainer, SocialHeader,
    ForgotMsgBtn, ForgotMsgBtnText, HeaderContainer, HeaderText, HeaderSubText, FooterText
} from './styles';
import { UserContext } from '../../contexts/UserContext';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { Formik } from 'formik';
import * as yup from 'yup';

import firebase from '../../../firebase'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmailIcon from '../../assets/email.svg';
import InvisibleIcon from '../../assets/invisible.svg';
import MCLogo from '../../assets/Logo.png'

LogBox.ignoreLogs(['Setting a timer']);

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required(),
    password: yup.string().required().min(8)
});

export default function Index() {
    const navigation = useNavigation();
    const { state, dispatch: userDispatch } = useContext(UserContext);
    var db = firebase.firestore();

    const handleLoginClick = async ({ email, password }) => {
        firebase.auth()
            // .signInWithEmailAndPassword('test@yahoo.com', 'passpass')
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                userDispatch({
                    type: 'setUID',
                    payload: {
                        uid: user.user.uid
                    }
                });
                db.collection("users").doc(`${user.user.uid}`).get().then((user) => {
                    console.log('User signed in!')
                    userDispatch({
                        type: 'setName',
                        payload: {
                            name: `${user.data().name}`
                        }
                    });
                    navigation.reset({
                        routes: [{ name: 'Drawer' }]
                    });

                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    alert('That email address is invalid!');
                }

                if (error.code === 'auth/wrong-password') {
                    console.log('The password is invalid!');
                    alert('The password is invalid!');
                }

                if (error.code === 'auth/user-not-found') {
                    console.log('User account not found!');
                    alert('User account not found!');
                }
                // console.error(error.code);
            });
        // } else {
        //     alert("All fields must be filled!");
        // }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}

            <Logo source={MCLogo} />
            <FormContainer>
                <HeaderContainer>
                    <HeaderText >Hello</HeaderText>
                    <HeaderSubText >Sign into your account</HeaderSubText>
                </HeaderContainer>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, actions) => {
                        handleLoginClick({ email: values.email, password: values.password });
                        // actions.resetForm();
                    }}>
                    {(props) => (
                        <InputArea>
                            <FormInput
                                inputTitle='Email address*'
                                IconSvg={EmailIcon}
                                iconColor={'#2E708C'}
                                error={props.errors.email}
                                touched={props.touched.email}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                onChangeText={props.handleChange('email')}
                                placeholder='Enter your e-mail'
                                keyboardType='email-address'
                                autoCapitalize='none' />

                            <FormInput
                                inputTitle='Password*'
                                IconSvg={InvisibleIcon}
                                iconColor={'#2E708C'}
                                error={props.errors.password}
                                touched={props.touched.password}
                                onBlur={props.handleBlur('password')}
                                value={props.values.password}
                                onChangeText={props.handleChange('password')}
                                password={true}
                                placeholder='Enter your password'
                                secureTextEntry={true} />

                            {/* Todo: add forgotMsg function to add onPress */}
                            <ForgotMsgBtn >
                                <ForgotMsgBtnText>Forgot your password?</ForgotMsgBtnText>
                            </ForgotMsgBtn>

                            <FormButton btnTitle='Login' color='#56C8B7' onPressHandler={props.handleSubmit} />
                        </InputArea>
                    )}
                </Formik>

                <SocialHeader>Or Login using social media</SocialHeader>
                <SocialContainer>
                    <MaterialCommunityIcons style={styles.socialIcon} name="facebook" size={hp('3.2%')} color="#3B5998" />
                    <MaterialCommunityIcons style={styles.socialIcon} name="twitter" size={hp('3.2%')} color="#1da1f2" />
                    <MaterialCommunityIcons style={styles.socialIcon} name="google" size={hp('3.2%')} color="#ea4335" />
                </SocialContainer>
            </FormContainer>

            <FooterContainer>
                <FooterText >Don't have an account? </FooterText>
                <FooterMessageButton onPress={handleMessageButtonClick}>
                    <FooterMessageButtonText>Register Now</FooterMessageButtonText>
                </FooterMessageButton>
            </FooterContainer>
        </Container>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: '-5%',
        marginBottom: '10%'
    },
    socialIcon: {
        marginRight: 16,
        marginLeft: 16,
        marginTop: 10
    }
});