import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Linking, ScrollView, Dimensions, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import { useDispatch } from "react-redux";
import { verifiedEmail } from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";
//importing modals
import AuthModal from '../modals/authModal'

const Verification = ({ navigation }) => {
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")

    const route = useRoute()
    let dispatch = useDispatch()

    //getting email from previous page
    const {
        email
    } = route.params

    //this handler check if user email has been verified
    const continueHandler = async () => {

        let res = await dispatch(verifiedEmail({ email: email }))
        if (!res.bool) {
            setAuthInfo(res.message)
            setIsAuthError(true)
            return
        }
   //navigation on sucessful api call
        navigation.navigate('Secure', {
            email: email
        })

    }

    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }


    const openMail = () => {
        Linking.openURL('mailto:')
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.navigationHeader}>
                    <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={22} fontWeight={100} color="rgb(44, 44, 44)" style={{ fontWeight: '200' }} />
                    </TouchableOpacity>
                    <View style={styles.progress}>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0.3} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>
                        <View style={styles.progressbar}>
                            <Progress.Bar progress={0} width={50} height={4} unfilledColor='rgb(240,240,240)' borderColor='#fff' />

                        </View>


                    </View>

                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/icons/photo1(7).jpg')}
                            style={{ width: 250, height: 250, }} />

                    </View>

                    <View style={styles.verificationContainer}>
                        <Text style={styles.headerText}>
                            Verify your email
                        </Text>
                        <Text style={styles.verificationText}>
                            We sent a verification email to
                            <Text style={styles.email}> {email} </Text> Please tap the link inside that email to

                            continue
                        </Text>

                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.checkBtnContainer} onPress={openMail}>
                            <Text style={styles.check}>
                                Check mail box
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.resendBtnContainer} onPress={continueHandler}>
                            <Text style={styles.resend}>continue</Text>

                        </TouchableOpacity>


                    </View>

                </ScrollView>




            </View>

        </SafeAreaView>
    </>
    )




}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: '5%',
        paddingTop: 20

    },
    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
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
        alignItems: 'center'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
        marginVertical: 20,
        marginBottom: 40,
    },
    verificationContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 70
    },

    headerText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    verificationText: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '200',
        color: 'rgb(100,100,100)',
        fontSize: 16,
        fontFamily: 'ABeeZee'
    },
    email: {
        color: 'rgb(44, 44, 44)',
        fontWeight: '600'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width

    },
    checkBtnContainer: {
        width: '85%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resendBtnContainer: {
        width: '85%',
        alignSelf: 'center',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    check: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins',
    },
    resend: {
        fontSize: 15,
        fontFamily: 'Poppins',

    }

});




export default Verification