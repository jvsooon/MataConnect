import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Container, FormContainer, InputArea, Logo, FooterContainer, FooterMessageButton,
    FooterMessageButtonText, SocialContainer, SocialHeader, Header, FooterText
} from './styles';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import { Formik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '../../contexts/UserContext';
import firebase from '../../../firebase'

import EmailIcon from '../../assets/email.svg'
import PersonIcon from '../../assets/person.svg'
import InvisibleIcon from '../../assets/invisible.svg';
import MCLogo from '../../assets/Logo.png'

const registerSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email('Invalid email').required(),
    password: yup.string().required().min(8)
});

export default function Index() {
    const navigation = useNavigation();
    var db = firebase.firestore();
    const { dispatch: userDispatch } = useContext(UserContext);

    const handleRegisterClick = async (fullName, email, password) => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('User successfully created an account.')
                db.collection("users").doc(`${user.user.uid}`).set({
                    name: fullName
                })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

                userDispatch({
                    type: 'setName',
                    payload: {
                        name: fullName
                    }
                });

                navigation.reset({
                    routes: [{ name: 'Drawer' }]
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
                // console.error(error);
            });
        // } else {
        //     alert("All fields must be filled!")
        // }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'Login' }]
        });
    }

    return (
        <Container>
            {Platform.OS == 'ios' ? <StatusBar barStyle='dark-content' /> : <StatusBar />}

            <Logo source={MCLogo} />
            <FormContainer>
                <Header>Create Account</Header>
                <Formik
                    initialValues={{ fullName: '', email: '', password: '' }}
                    validationSchema={registerSchema}
                    onSubmit={(values, actions) => {
                        handleRegisterClick({ fullName: values.fullName, email: values.email, password: values.password });
                        // actions.resetForm();
                    }}>
                    {(props) => (
                        <InputArea>
                            <FormInput
                                inputTitle='Full Name*'
                                IconSvg={PersonIcon}
                                iconColor={'#49ABA8'}
                                error={props.errors.fullName}
                                touched={props.touched.fullName}
                                onBlur={props.handleBlur('fullName')}
                                value={props.values.fullName}
                                onChangeText={props.handleChange('fullName')}
                                placeholder='Enter your first and last name'
                            />

                            <FormInput
                                inputTitle='Email address*'
                                IconSvg={EmailIcon}
                                iconColor={'#49ABA8'}
                                error={props.errors.email}
                                touched={props.touched.email}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                                onChangeText={props.handleChange('email')}
                                placeholder='Enter your e-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />

                            <FormInput
                                inputTitle='Password*'
                                IconSvg={InvisibleIcon}
                                iconColor={'#49ABA8'}
                                error={props.errors.password}
                                touched={props.touched.password}
                                onBlur={props.handleBlur('password')}
                                placeholder='Enter your password'
                                value={props.values.password}
                                onChangeText={props.handleChange('password')}
                                password={true}
                                secureTextEntry={true}
                            />

                            <FormButton btnTitle='Register' color='#21537D' onPress={props.handleSubmit} />
                        </InputArea>
                    )}
                </Formik>

                <SocialHeader>Or Login using social media</SocialHeader>
                <SocialContainer>
                    <MaterialCommunityIcons style={styles.socialIcon} name="facebook" size={24} color="#3B5998" />
                    <MaterialCommunityIcons style={styles.socialIcon} name="twitter" size={24} color="#1da1f2" />
                    <MaterialCommunityIcons style={styles.socialIcon} name="google" size={24} color="#ea4335" />
                </SocialContainer>
            </FormContainer>

            <FooterContainer>
                <FooterText>Already have an account? </FooterText>
                <FooterMessageButton onPress={handleMessageButtonClick}>
                    <FooterMessageButtonText>Login</FooterMessageButtonText>
                </FooterMessageButton>
            </FooterContainer>
        </Container>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: '-5%',
        marginBottom: '5%'

    },
    socialIcon: {
        marginRight: 16,
        marginLeft: 16,
        marginTop: 10
    }
});