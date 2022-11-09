import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { login } from "../store/action/appStorage";
import LoginModal from '../modals/loginModal';
import { validateEmail, validatePassword } from "../utils/util";
import { useDispatch } from "react-redux";
import AuthModal from '../modals/authModal';
import Loader from '../loaders/Loader'


const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(' ');
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("")
    const [isPageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setModalVisible(true)
        });
        return focus

    }, [navigation]);


    useEffect(() => {
        setTimeout(() => {
            setIsPageLoading(false)
        }, 2000)
    }, []);


    let navigateHandler = useCallback(() => {
        navigation.removeListener('beforeRemove')
        setModalVisible(false)
        navigation.goBack()
    }, [])

    let navigateToBrowser = async (data) => {
        if (data == 'password') {
            //navigate to password reset page
            await WebBrowser.openBrowserAsync('http://www.coincap.cloud/forgetPassword')
        } else {
            //navigate to policy page
            await WebBrowser.openBrowserAsync('http://www.coincap.cloud/policy')
        }
    }

    let updateVisibility = useCallback(() => {
        setModalVisible(false)
    }, [])

    const changePassword = (e) => {
        setPassword(e)
        let error = validatePassword(e)
        if (error) {
            return setPasswordError(error)
        }
        return setPasswordError('')
    }

    const changeEmail = (e) => {
        setEmail(e)
        let error = validateEmail(e)
        if (error) {
            return setEmailError(error)
        }
        return setEmailError('')
    }


    let formValid = email && password && !emailError && !passwordError

    const submitHandler = async () => {
        if (!formValid) {
            return
        }
        setIsLoading(true)
        let res = await dispatch(login({
            email: email,
            password: password
        }))

        if (!res.bool) {
            setIsLoading(false)
            setIsAuthError(true)
            setAuthInfo(res.message)
            setUrl(res.url)
            return
        }

    }

    const updateAuthError = useCallback(() => {
        setIsAuthError(prev => !prev)
        setAuthInfo('')
        navigation.navigate(url,{
            email:email
        })
    }, [url])


    if (isPageLoading) {
        return <Loader />
    }



    return (<>
        <LoginModal modalVisible={modalVisible}
            updateVisibility={updateVisibility} navigateHandler={navigateHandler} />

        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, opacity: modalVisible ? 0.3 : 1 }}>
            <View style={styles.container}>
                <View style={styles.navigationHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={30} color="rgb(44, 44, 44)" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerText}>Sign in to coincap </Text>
                <KeyboardAvoidingView>
                    <Text style={styles.emailText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={changeEmail}
                        value={email}
                        placeholder='you@example.com'
                    />
                    <Text style={styles.errorText}>{emailError ? emailError : ""}</Text>

                    <Text style={styles.passwordText}>Password</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={changePassword}
                        value={password}
                        maxLength={8}
                        placeholder="password"
                        keyboardType='numeric'
                    />

                    <Text style={styles.errorText}>{passwordError ? passwordError : ""}</Text>


                    <TouchableOpacity style={{ ...styles.submitBtn }} onPress={submitHandler}>
                        {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.submitBtnTxt}>Sign In</Text>}
                    </TouchableOpacity>

                </KeyboardAvoidingView>

                <View style={styles.forgetPasswordCon}>
                    <TouchableOpacity style={styles.forgetPasswordText}>
                        <Text onPress={() => navigateToBrowser('password')} style={{ color: '#1652f0' }}>Forget password?</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.privacyText}>

                        <Text onPress={() => navigateToBrowser('policy')} style={{ color: '#1652f0' }}>Privacy Policy</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </>

    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalTop: {
        height: 4,
        width: '20%',
        backgroundColor: 'rgb(225,225,225)',
        position: 'absolute',
        top: '62%',
        alignSelf: 'center',
        borderRadius: 5
    },

    modalView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        alignItems: "center",

        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        top: '65%',
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1




    },
    modalQuest: {
        paddingTop: 20,
        fontSize: 22,
        fontFamily: 'Poppins',
        paddingLeft: 15,
        alignSelf: 'flex-start'

    },
    modalState: {
        paddingTop: 10,
        fontSize: 18,
        fontFamily: 'ABeeZee',
        fontWeight: '500',
        marginBottom: 15,
        paddingLeft: 15,
        alignSelf: 'flex-start',
        color: 'rgb(100,100,100)',

    },
    modalButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 2,

    },

    acceptBtn: {
        width: '50%',
        borderRadius: 50,
        paddingTop: 25,
        paddingBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        borderWidth: 1,
        borderColor: 'rgb(240,240,240)',
        backgroundColor: 'rgb(240,240,240)',
    },
    cancelBtn: {
        width: '35%',
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 50,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: 'ABeeZee'

    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "#fff",
        fontFamily: 'Poppins',
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        width: '90%',
        marginHorizontal: '5%'

    },
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 30

    },
    headerText: {
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'ABeeZee',
        marginBottom: 30
    },
    emailText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'ABeeZee',
        marginBottom: 15
    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        borderRadius: 2,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 15,


    },
    errorText: {
        color: 'red',
        marginVertical: 5,

    },
    passwordText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'ABeeZee',
        marginBottom: 15

    },
    submitBtn: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1652f0',
        fontFamily: 'ABeeZee',
        color: '#fff',
        fontWeight: "500",
        marginBottom: 30
    },
    submitBtnTxt: {
        color: '#fff'
    },
    forgetPasswordCon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    forgetPasswordText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'

    },
    privacyText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },



})




export default Login