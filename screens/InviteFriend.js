import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Dimensions, TextInput, Linking, Share } from 'react-native'
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Loader from '../loaders/Loader';

import * as Clipboard from 'expo-clipboard';
import { Card } from "react-native-shadow-cards"
import { useSelector } from "react-redux"
import { truncate } from "../utils/util"

const InviteFriend = ({ navigation }) => {
    const [header, setHeader] = useState(false);
    let [copyActionStyle, setCopyActionStyle] = useState('')
    let [isLoading, setIsLoading] = useState(true)
    //the user link will be gotten from redux
    const [link, setLink] = useState('')
    let { user } = useSelector(state => state.userAuth)
    
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
        let url = 'coincap.cloud'
        let username = user.lastName
        let fullUrl = `${url}/${username}`
        setLink(fullUrl)
        setTimeout(() => {
            setIsLoading(false)

        }, 4000)

    }, [])



    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }
    let timer
    const changeStyle = () => {
        setCopyActionStyle(false)
        clearTimeout(timer)

    }

    const shareToWhatsapp = async () => {
        const isSupported = await Linking.canOpenURL(`whatsapp://send?text=${link}`)
        if (!isSupported) {
            return
        }
        //whatsapp://send?text=precious
        // return await Linking.openURL('mailto:')
        return await Linking.openURL(`whatsapp://send?text=${link}`)

    }
    const shareToMessage = async () => {
        const isSupported = await Linking.canOpenURL(`whatsapp://send?text=${link}`)
        if (!isSupported) {
            return
        }
        return await Linking.openURL(`whatsapp://send?text=${link}`)

    }
    const share = async () => {
        await Share.share({
            message: `${link}`,
            //the url that user will click to the app
            url: 'kkk',
            title: `${link}`
        })

    }
    const navigateToCryptoCalculator = () => {
        navigation.navigate("Send")
    }
    const writeToClipboard = async () => {
        let url = 'coincap.cloud'
        let username = user.lastName
        let fullUrl = `${url}/${username}`
        //To copy the text to clipboard

        setCopyActionStyle(true)
        Clipboard.setString(fullUrl)
        timer = setTimeout(() => {
            changeStyle()

        }, 2000)



    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>

                <View style={{ ...styles.navigationHeader }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />
                        <Text style={{ ...styles.headerName }}>Invite Friends</Text>
                    </Pressable>
                </View>

                <Pressable style=
                    {styles.card}>
                    <Image
                        source={require('../assets/icons/box.jpeg')}
                        style={{ width: 70, height: 70, marginBottom: 35 }} />

                    <View style={styles.textContainer}>
                        <Text style={styles.contentText}>$10.00 in Bitcoin for you, $ 10.00 for a friend</Text>

                    </View>



                </Pressable>

                <Text style={styles.promiseText}>you'll both get rewarded when your friend trades $ 100.00 in crypto.</Text>
                <Text style={styles.termsText}>Terms Apply</Text>

                <View style={styles.sharableLinkContainer}>
                    <Text style={styles.actionText}>Share your link</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={truncate(link, 12)}
                        />
                        <Pressable style={{ ...styles.button, backgroundColor: copyActionStyle ? 'green' : '#1652f0' }} onPress={writeToClipboard}>
                            <Text style={styles.buttonText}>{copyActionStyle ? 'copied' : 'copy'}</Text>
                        </Pressable>
                    </View>

                </View>

                <View style={styles.sharableSocialLinkContainer}>
                    <Text style={styles.actionText}>More ways to share</Text>

                    <View style={styles.socialContainer}>
                        <Card style={styles.messageCard} onPress={shareToMessage}>
                            <Pressable style={styles.messageContainer} onPress={shareToMessage}>
                                <MaterialCommunityIcons name="message-text-outline" size={24} color="#fff"
                                    style={styles.messageIcon} />


                            </Pressable>
                            <Text style={styles.messageText}>Messages</Text>


                        </Card>
                        <Card style={styles.whatsappCard} onPress={shareToWhatsapp}>
                            <Pressable onPress={shareToWhatsapp} style={styles.whatsappContainer}>
                                <Ionicons name="md-logo-whatsapp" size={24} color="#fff" style={styles.whatsappIcon} />


                            </Pressable>
                            <Text style={styles.whatsappText}>whatsapp</Text>


                        </Card>





                    </View>

                    <Card style={styles.shareContainer}>
                        <Pressable style={styles.shareIconContainer} onPress={share}>
                            <Feather name="share" size={20} color="black" />



                        </Pressable>

                        <Text style={styles.shareText}>Share</Text>

                    </Card>

                    <Pressable onPress={() => navigateToCryptoCalculator()}>
                        <Card style={styles.cryptogiftContainer} >
                            <View style={styles.cryptogiftContent}>
                                <Text style={styles.cryptogiftContentHeader}>Crypto gifts.</Text>
                                <Text style={styles.cryptogiftContentText}>Give crypto to your friends and family</Text>

                            </View>
                            <View style={styles.cryptogiftImage}>
                                <Image
                                    source={require('../assets/icons/pay.jpg')}
                                    style={{ width: 90, height: 90 }} />

                            </View>

                        </Card>

                    </Pressable>

                </View>




            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollViewContainer: {
        paddingBottom: 100,
        width: Dimensions.get('window').width,
        paddingHorizontal: 17

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
        alignItems: 'center'


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

    card: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    textContainer: {
        width: '70%',
        marginLeft: '5%'
    },
    contentText: {
        fontSize: 22,
        fontFamily: 'ABeeZee'
    },
    promiseText: {
        fontFamily: 'ABeeZee',
        fontSize: 16.5,
        color: 'rgb(100,100,100)',
        marginBottom: 5

    },
    termsText: {
        color: '#1652f0',
        fontSize: 16.5,
        marginBottom: 20,
        fontFamily: 'ABeeZee'
    },
    sharableLinkContainer: {
        marginBottom: 25

    },
    actionText: {
        fontSize: 16,
        fontFamily: 'Poppins'

    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 2
    },
    input: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 65,
        width: '60%',
        textAlign: 'center',
        borderRadius: 10
    },
    button: {
        width: '35%',
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Poppins'
    },
    sharableSocialLinkContainer: {


    },
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 1


    },
    messageCard: {
        width: '47%',
        height: 110,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 10

    },
    messageContainer: {
        backgroundColor: 'rgb(5, 158, 5)',
        width: 40,
        height: 40,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    whatsappCard: {
        width: '47%',
        height: 110,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 10


    },
    whatsappContainer: {
        backgroundColor: 'rgb(5, 158, 5)',
        width: 40,
        height: 40,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    shareContainer: {
        width: '100%',
        height: 130,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    shareIconContainer: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20

    },
    shareText: {
        fontSize: 16,
        fontFamily: 'ABeeZee'

    },
    whatsappText: {
        fontSize: 15,
        fontFamily: 'ABeeZee'
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'ABeeZee'
    },

    cryptogiftContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 50,
        marginBottom: 50,
        paddingHorizontal: 15


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
        color: 'rgb(100,100,100)'

    },
    cryptogiftImage: {
        flex: 1

    },



    footerSection: {
        backgroundColor: 'red',
        height: 200,
        position: 'absolute',
        width: '100%'
    }


})

export default InviteFriend