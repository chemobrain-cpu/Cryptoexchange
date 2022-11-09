import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions, ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { changePhone } from "../store/action/appStorage";
import AuthModal from '../modals/authModal';
import Loader from '../loaders/Loader'

const NewPhone = ({ navigation }) => {
    let [isChangeNumber, setIsChangeNumber] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isUrl, setIsUrl] = useState("")
    let dispatch = useDispatch()
    let { user, notifications } = useSelector(state => state.userAuth)

     //preventing memory leak
    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            if (isLoading) {
                e.preventDefault();
            } else {
                //can go back
            }
        });
        return focus
    }, [isLoading]);


    let changeNumber = (e) => {
        console.log(e)
        setIsChangeNumber(e)
    }

    let gobackHandler = () => {
        navigation.goBack()
    }

    let submitHandler = async () => {
        //after verificationn was suceesfull
        if (!isChangeNumber) {
            return
        }

        setIsLoading(true)

        let res = await dispatch(changePhone({
            phone: isChangeNumber
        }))

        if (!res.bool) {
            setIsLoading(false)
            setAuthInfo(res.message)
            setIsAuthError(true)
            return
        }
        setIsLoading(false)
        setAuthInfo(res.message)
        setIsAuthError(true)
        setIsUrl('ConfirmNewPhone')
    }
    const updateAuthError = () => {

        setIsAuthError(prev => !prev)
        if(isUrl){
            navigation.navigate(isUrl)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }, [])

    if (isLoading) {
        return <Loader />
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={styles.screen}>

            <View style={styles.navigationHeader}>
                <Ionicons name="arrow-back" size={22} fontWeight={100} color="rgb(44, 44, 44)" onPress={gobackHandler} />
                <Text style={styles.headerText}>
                    Enter new Phone
                </Text >



            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>



                <KeyboardAvoidingView style={styles.formContainer}>

                    <View style={styles.CodeCon}>

                        <TextInput
                            style={styles.input}
                            onChangeText={changeNumber}
                            value={isChangeNumber}
                            placeholder='+1 212 555 0123'
                            keyboardType='phone-pad'
                            maxLength={15}
                        />

                    </View>

                </KeyboardAvoidingView>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonContinue} onPress={submitHandler}>

                        {isLoading ? <ActivityIndicator color='#fff' size='large' /> : <Text style={styles.buttonContinueText}>
                            Send code
                        </Text>}

                    </TouchableOpacity>

                </View>


            </ScrollView>


        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: '5%',
    },

    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        borderColor: '#fff',

    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {
        paddingLeft: 8

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    headerText: {
        fontSize: 20,
        color: 'rgb(44, 44, 44)',
        fontFamily: 'Poppins',
        marginLeft: 30

    },

    CodeCon: {
        width: '90%'

    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 55,
        borderRadius: 5,
        paddingLeft: 10,

    },


    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 1.6

    },
    buttonContainer: {

    },
    buttonContinue: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonContinueText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    },
    buttonResendText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
        color: 'rgb(44, 44, 44)'
    },

});



export default NewPhone