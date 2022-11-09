import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, ActivityIndicator, Platform, Pressable,Alert } from 'react-native'
import ContentLoaders from '../loaders/contentLoader'
import WatchList from '../component/HomeWatchList'
import Button from '../component/homeButton'
import TopMovers from "../component/HomeTopMovers"
import TimelineContainer from "../component/homeTimeline"
import Setup from "../component/setup"
import { Entypo, Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards"
import { timelineData } from "../data/data"
import { useDispatch, useSelector } from "react-redux";
import Error from '../component/errorComponent'
import { loadCoins, loadWatchList, addNotificationToken,getUser } from "../store/action/appStorage";
import ShortListLoader from '../loaders/shortListLoader'
import MoversLoader from "../loaders/moversLoader";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Home = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isWatchListLoading, setIsWatchListLoading] = useState(true)
    const [header, setHeader] = useState(false);
    const [headerAction, setHeaderAction] = useState(false);
    const [isError, setIsError] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch()
    const [watchListCoins, setWatchListCoins] = useState([]);
    const [topMoversCoinList, setTopMoversCoinList] = useState([]);
    let [isMoversLoading, setIsMoversLoading] = useState(true)

    //notification
    const [expoPushToken, setExpoPushToken] = useState([]);
  
    let { user } = useSelector(state => state.userAuth)



    useEffect(() => {
        Notifications.addNotificationReceivedListener(notification => {
            //write a logic to update the user
            fetchUser().then(()=>{
                setIsLoading(false)
            })
        })

        Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate('Notification')
            //update user when notification is recieved
        })
    }, [fetchUser]);

    let fetchUser = async()=>{
        setIsLoading(true)
        let res = await dispatch(getUser())
        if(!res){
            setIsError(true)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        //registering for push notification
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    }, []);



    const registerForPushNotificationsAsync = async () => {
        let token;
        //configuration for android
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }


        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Permission required',
            'Push notifications need the appropriate permissions.')
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        //save the token in users account

        if (token) {
            let res = await dispatch(addNotificationToken({ notificationToken: token }))
            if (!res.bool) {
                setIsError(true)
            }
        }
        return token;
    }

    let fetchData = async () => {
        // You can await here

        let response = await dispatch(loadCoins())
        if (!response.bool) {
            setIsError(true)
        }

        setTopMoversCoinList([...[response.message[5], response.message[6], response.message[15], response.message[7], response.message[11], response.message[10], response.message[8]]])

        setIsMoversLoading(false)
        setIsLoading(false)

    }

    let fetchWatchList = async () => {
        // You can await here
        if (user.watchList.length < 1) {
            let response = await dispatch(loadCoins())
            if (!response.bool) {
                setIsError(true)
                setIsWatchListLoading(false)
                return
            }

            setWatchListCoins([...[response.message[0], response.message[1], response.message[2], response.message[3], response.message[4], response.message[5], response.message[6]]]);

            setIsWatchListLoading(false)
            setIsLoading(false)

        } else {
            let transformIds = user.watchList.join('%2c')
            let response = await dispatch(loadWatchList(transformIds))
            if (!response.bool) {
                setIsError(true)
                setIsWatchListLoading(false)
                return
            }
            setWatchListCoins(response.message);
            setIsWatchListLoading(false)
            setIsLoading(false)
        }



    }

    let navigationHandler = (coin) => {

        navigation.navigate('BuyPriceChart',
            {
                price: coin.current_price,
                percentage: parseFloat(coin.price_change_percentage_24h).toFixed(2),
                name: coin.id.toLowerCase(),
                market_cap: coin.market_cap,
                total_volume: coin.total_volume, circulating_supply: coin.circulating_supply,
                market_cap_rank: coin.market_cap_rank
            })
    }

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 1000) {
            setHeader(true)
            setHeaderAction(true)
        }
        else {
            setHeader(false)
            setHeaderAction(false)
        }
    }

    let tryAgain = () => {
        setIsError(false)
        setIsMounted(true)
        setIsLoading(true)
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        fetchData()
        fetchWatchList()
    }

    let setupHandler = (url) => {
        navigation.navigate(url)
    }

    let actionHandler = (data) => {
        if (data === "Buy") {
            navigation.navigate("BuyCryptoList")
        } else if (data === "Sell") {
            navigation.navigate("SellList")

        } else if (data == "Recieve") {
            navigation.navigate("Recieve")

        } else if (data == "Send") {
            navigation.navigate("Send")

        } else if (data == 'Convert') {

            navigation.navigate("ConvertList")

        } else if (data == 'Receive') {

            navigation.navigate("Recieve")

        }
    }



    useEffect(() => {
        setIsMounted(true)
        setIsLoading(true)
        fetchData()
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        return () => {
            setIsMounted(false)
        }

    }, [])


    //use effect for watchlistCoin
    useEffect(() => {
        fetchWatchList()
    }, [])

    const parentErrorHandler = () => {
        if (isMounted) {
            return setIsError(true)
        }
    }


    if (isLoading) {
        return <ContentLoaders />
    }

    if (isError) {
        //navigate to error
        return <Error
            tryAgain={tryAgain}

        />
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <>
                    {header ? <View >
                        <View style={{ ...styles.headerContainer }}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Entypo name="menu" size={24} color="black" />

                            </TouchableOpacity>

                            <TouchableOpacity >

                                {user.isHideBalance ? <Text style={styles.giftText}>
                                </Text> : <Text style={{ ...styles.giftText }}>

                                    ${Number(user.accountBalance).toFixed(2)}

                                </Text>}


                            </TouchableOpacity>




                            <TouchableOpacity onPress={() => navigation.navigate('Notification')} >
                                <Ionicons name="notifications" size={30} color="black" />
                                <View style={styles.notification}>
                                    <View style={styles.notificationTextContainer}>
                                        <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                    </View>

                                </View>

                            </TouchableOpacity>

                        </View>


                        {headerAction ? <View style={{ ...styles.actionContainer, zIndex: 15, backgroundColor: '#fff' }}>
                            <Button
                                text="Buy"
                                pressHandler={actionHandler}
                            >
                                <Ionicons name="add" size={30} color="#fff" />
                            </Button>

                            <Button
                                text="Sell"
                                pressHandler={actionHandler}
                            >
                                <AntDesign name="minus" size={22} color="#fff" />
                            </Button>

                            <Button
                                text="Send"
                                pressHandler={actionHandler}
                            >
                                <AntDesign name="arrowup" size={22} color="#fff" />
                            </Button>

                            <Button
                                text="Convert"
                                pressHandler={actionHandler}
                            >
                                <Octicons name="sync" size={22} color="#fff" />
                            </Button>

                            <Button
                                text="Receive"
                                pressHandler={actionHandler}
                            >
                                <AntDesign name="arrowdown" size={22} color="#fff" />
                            </Button>

                        </View> : <></>}



                    </View> : <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.giftContainer}>

                            {user.isHideBalance ? <Text style={{ ...styles.giftText }}>



                            </Text> : <Text style={styles.giftText}>

                                ${Number(user.accountBalance).toFixed(2)}

                            </Text>}


                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('Notification')} >
                            <Ionicons name="notifications" size={30} color="black" />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </TouchableOpacity>


                    </View>}
                </>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/homebox.jpg')}
                        style={{ width: 250, height: 250, marginBottom: 35 }} />

                </View>


                <Setup setupHandler={setupHandler} />



                <Text style={styles.explore}>Explore Coincap</Text>
                <Pressable>
                    <Card style={styles.learnearnContainer}>
                        <View>
                            <Text style={styles.learnText}>
                                Want to learn
                            </Text>
                            <Text style={styles.learnText}>
                                more?
                            </Text>

                            <Text style={styles.earnText}>
                                Want to learn
                            </Text>
                            <Text style={styles.earnText}>
                                more?
                            </Text>

                        </View>


                        <Image
                            source={require('../assets/icons/bulb.jpg')}
                            style={{ width: 60, height: 60, marginBottom: 35 }} />


                    </Card>
                </Pressable>


                {headerAction ? <></> : <View style={styles.actionContainer}>

                    <Button
                        text="Buy"
                        pressHandler={actionHandler}
                    >
                        <Ionicons name="add" size={30} color="#fff" />
                    </Button>

                    <Button
                        text="Sell"
                        pressHandler={actionHandler}
                    >
                        <AntDesign name="minus" size={22} color="#fff" />
                    </Button>

                    <Button
                        text="Send"
                        pressHandler={actionHandler}
                    >
                        <AntDesign name="arrowup" size={22} color="#fff" />
                    </Button>

                    <Button
                        text="Convert"
                        pressHandler={actionHandler}
                    >
                        <Octicons name="sync" size={22} color="#fff" />
                    </Button>

                    <Button
                        text="Receive"
                        pressHandler={actionHandler}
                    >
                        <AntDesign name="arrowdown" size={22} color="#fff" />
                    </Button>

                </View>}

                <View style={styles.watchListContainer}>
                    <View>
                        <Text style={styles.watchHeader}>Watchlist</Text>
                    </View>

                    {isWatchListLoading ? <ShortListLoader /> : <WatchList navigationHandler={navigationHandler} parentErrorHandler={parentErrorHandler}
                        coins={watchListCoins}
                    />}

                </View>

                <View style={styles.topMoversContainer}>
                    <Text
                        style={styles.topMoversHeadingText}
                    >
                        Top Movers
                    </Text>

                    {isMoversLoading ? <MoversLoader /> : <TopMovers
                        navigationHandler={navigationHandler} parentErrorHandler={parentErrorHandler}
                        coins={topMoversCoinList}
                    />}

                </View>


                {timelineData.map(data => <TimelineContainer key={data.about} data={data} />)}

                <View style={styles.spinnerContainer}>
                    <ActivityIndicator color='#1652f0' size={30} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 0,

    },
    scrollContainer: {
        paddingBottom: 100,
    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        alignItems: 'center'

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 30,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color: 'red',
    },

    notification: {
        position: 'relative',
        padding: 10,
        marginRight: 20,
        alignSelf: 'center',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    notificationTextContainer: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 35,
        backgroundColor: 'red',
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20,

    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },

    imageContainer: {
        height: Dimensions.get('window').height / 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    explore: {
        fontSize: 22,
        fontFamily: 'Poppins',
        marginBottom: 10,
        marginHorizontal: '5%',
    },
    learnearnContainer: {
        borderRadius: 10,
        padding: 15,
        marginHorizontal: '5%',
        marginBottom: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: -5

    },
    learnText: {
        fontSize: 18,
        fontFamily: 'Poppins',
    },
    earnText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)'
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
        paddingBottom: 10,
        paddingHorizontal: '5%',
        backgroundColor: '#fff'
    },

    watchListContainer: {
        borderBottomWidth: .5,
        borderBottomColor: "rgb(225,225,225)",
        marginBottom: 20,

    },
    watchHeader: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: "rgb(44, 44, 44)",
        paddingTop: 10,
        marginHorizontal: '5%',
    },
    topMoversContainer: {
        marginLeft: '5%',
        paddingTop: 2,
        marginBottom: 50
    },
    spinnerContainer: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topMoversHeadingText: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: "rgb(44, 44, 44)",
        paddingTop: 10,
        paddingBottom: 10
    },

})


export default Home





































