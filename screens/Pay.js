import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import PayLoaders from '../loaders/payloader'

const Pay = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [text, setText] = useState('')
    let [focus, setFocus] = useState(false)
    let { user} = useSelector(state => state.userAuth)


    const navigateToRecieve = () => {
        navigation.navigate('Recieve')
    }
    const navigateToSend = () => {
        navigation.navigate('PaymentChoice')
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
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)

    }, [])

    if (isLoading) {
        return <PayLoaders />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, backgroundColor: '#fff', }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.giftContainer}>
                            <Text style={styles.giftText}>Pay </Text>

                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                            <Ionicons name="notifications" size={30} color="black" />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </TouchableOpacity>


                    </View>
                </View>

                <View style={styles.cryptogiftContainer}>
                    <View style={styles.cryptogiftContent}>
                        <Text style={styles.cryptogiftContentHeader}>Crypto gifts.</Text>
                        <Text style={styles.cryptogiftContentText}>Give crypto to your friends and family</Text>

                    </View>
                    <View style={styles.cryptogiftImage}>
                        <Image
                            source={require('../assets/icons/pay.jpg')}
                            style={{ width: 90, height: 90 }} />

                    </View>

                </View>



                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: 'rgb(240,240,240)' }} onPress={navigateToRecieve}>
                        <Text style={{ ...styles.buttonText, color: 'black' }}>
                            Recieve
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: '#1652f0' }} onPress={navigateToSend}>
                        <Text style={{ ...styles.buttonText }}>
                            Send
                        </Text>

                    </TouchableOpacity>

                </View>




            </ScrollView>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingBottom: 150
    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 25,

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20
    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },


    cryptogiftContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        height: Dimensions.get('window').height / 1.7,


    },
    cryptogiftContent: {
        flex: 2

    },
    cryptogiftContentHeader: {
        fontSize: 18,
        fontFamily: 'Poppins'

    },
    cryptogiftContentText: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        color: 'grey'

    },
    cryptogiftImage: {
        flex: 1

    },

    buttonContainer: {
        borderTopWidth: .5,
        borderColor: 'rgb(180,180,180)',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '20%',

    },
    button: {
        paddingVertical: 17,
        borderRadius: 40,
        width: '40%',
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15

    }




})

export default Pay;