import React, { useState,useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native'

import { Feather } from '@expo/vector-icons';
import { validateText } from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { sendCrypto } from "../store/action/appStorage";
import { useRoute } from "@react-navigation/native";


const CryptoForm = ({ navigation }) => {
    let { user } = useSelector(state => state.userAuth)
    const [walletAddress, setWalletAddress] = useState('')
    const [walletAddressError, setWalletAddressError] = useState('')
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [url, setUrl] = useState("")
    const route = useRoute();


    const {
        price,
        name,
        quantity
    } = route.params


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




    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
        if (url) {
            navigation.navigate(url)
        }
        return
    }

    let submitHandler = async () => {
        // check for validity of the crypto
        if (walletAddressError) {
            return
        }


        setIsLoading(true)

        let res = await dispatch(sendCrypto())
        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            setUrl(res.url)
            return
        }
    
        setIsAuthError(true)
        setAuthInfo("Transaction is being processed")
        setIsLoading(false)




    }


    let changeAddressOne = (e) => {
        setWalletAddress(e)
        let error = validateText(e)
        if (error) {
            return setWalletAddressError(error)
        }
        return setWalletAddressError('')

    }







    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }







    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{ ...styles.navigationHeader }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>You're about sending {quantity.toFixed(5)} {name} worthing ${price.toFixed(5)}</Text>

                </View>

                <KeyboardAvoidingView style={styles.formCon}>
                    <TextInput style={styles.input}
                        onChangeText={changeAddressOne}
                        placeholder="Enter crypto address" />


                </KeyboardAvoidingView>


                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>


                        <TouchableOpacity style={styles.buttonCon} onPress={submitHandler}>
                            {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.button}>Send</Text>}
                        </TouchableOpacity>
                    </View>



                </View>
            </ScrollView>

        </SafeAreaView>
    </>

    )
}

const styles = StyleSheet.create({
    scrollviewContainer: {
        flex: 1,
        width: Dimensions.get('window').width,


    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 21,


    },
    headerName: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        marginLeft: '20%',
        fontFamily: 'Poppins'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 21,
    },
    titleText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        textAlign: 'center'


    },
    formCon: {
        marginBottom: 100,
        paddingHorizontal: 21,

    },
    label: {
        marginBottom: 10,
        fontWeight: '100',
        color: 'rgb(100,100,100)',
        fontFamily: 'Poppins',

    },
    input: {
        width: '80%',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        marginRight: 'auto',
        marginLeft: 'auto'

    },
    errorText: {
        color: 'red',
        marginVertical: 1,

    },
    NumberinputContainer: {
        width: '100%',
        borderColor: 'rgb(100,100,100)',
        borderWidth: .5,
        height: 70,
        borderRadius: 3,
        paddingLeft: 30,
        fontSize: 18,
        color: 'black',
        display: 'flex',
        flexDirection: 'column'


    },
    numberinput: {
        alignSelf: 'stretch',
        width: '70%',
        fontSize: 15,

    },
    innerInputContainer: {
        width: '45%'
    },
    footer: {
        height: 220
    },
    footerTopSection: {
        paddingHorizontal: 21,

    },
    statement: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        marginBottom: 30

    },
    statementCard: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        color: '#1652f0'

    },
    buttonCon: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    button: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: '#fff'
    },
    footerBottomSection: {
        height: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: 'rgb(100,100,100)',
        borderTopWidth: .5,
        backgroundColor: 'rgb(245,245,245)'
    },
    footerTextCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        marginLeft: 5
    },
    coinbaseText: {
        color: '#1652f0'
    }




})

export default CryptoForm