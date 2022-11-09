import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { Entypo,Ionicons} from '@expo/vector-icons';
import AssetsLoaders from '../loaders/assetsLoader'
import {useSelector } from "react-redux";

const Assets = ({navigation}) => {
    let [isLoading, setIsLoading] = useState(true)
    let { user} = useSelector(state => state.userAuth)

   
   

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)

    },[])
    //navigating to buy assets list

    let navigateToAsset = ()=>{
        //navigate to my personal asset
        navigation.navigate('SellList')
    }

    let buyAssetHandler = ()=>{
        //go to buy crypto list
        navigation.navigate('BuyCryptoList')
    }
    
    if(isLoading){
        return <AssetsLoaders/>
    }
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.scrollContainer}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Entypo name="menu" size={24} color="black" />

                        </TouchableOpacity>

                        <TouchableOpacity  style={styles.giftContainer}>

                            <Text style={styles.giftText}>Assets</Text>


                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Ionicons name="notifications"  size={30} color="black" />
                            <View style={styles.notification}>
                                <View style={styles.notificationTextContainer}>
                                    <Text style={styles.notificationText}>{user.notifications.length}</Text>

                                </View>

                            </View>

                        </TouchableOpacity>


                    </View>
                </View>

                <View style={styles.balanceContainer}>
                    {user.isHideBalance?<Text style={styles.balanceText}></Text>:<Text style={styles.balanceText}>Your balance</Text>}

                    {user.isHideBalance ?<Text style={styles.balanceAmount}></Text>:<Text style={styles.balanceAmount}>$ {Number(user.accountBalance).toFixed(2)}</Text>}


                </View>


                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/graphics9.jpg')}
                        style={{ width: 100, height: 100 }} />

                </View>
                <View style={styles.starterContainer}>

                    <Text style={styles.starterHead}>Get started with crypto</Text>

                    <Text style={styles.starterInfo}>Purchase crypto to earn.</Text>

                    <TouchableOpacity style={styles.buttonContainer} onPress={navigateToAsset}>
                        <Text style={styles.buttonText}>Your assets</Text>

                    </TouchableOpacity>
                </View>

                <View style={styles.buyContainer}>
                    <Text style={styles.buyHead}>Recurring buys</Text>
                    <View style={styles.buySubContainer}>
                        <View style={styles.subImageContainer}>
                        <Image
                            source={require('../assets/icons/graphics8.jpg')}
                            style={styles.subImage} />

                        </View>
                        

                        <View style={styles.subHeadContainer}>
                            <Text style={styles.subHead}> Learn more about recurring buys</Text>
                            <Text style={styles.subText}>Invest daily,weekly, or monthly </Text>
                        </View>

                        



                    </View>

                    <TouchableOpacity style={styles.buttonContainer} onPress={buyAssetHandler}>
                        <Text style={styles.buttonText}>Buy assets</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>






        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 100,
        paddingHorizontal: 15,

    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',

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
        fontSize: 18,
        fontFamily: 'Poppins',
        marginLeft: 10,
        alignSelf: 'center'
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
    balanceContainer:{

    },
    balanceText:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color:'grey'

    },
    balanceAmount:{
        fontSize: 30,
        fontFamily: 'Poppins',

    },
    
    imageContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    


    },
    starterContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 35
    },
    starterHead: {
        fontSize: 20,
        fontFamily: 'Poppins'


    },
    starterInfo: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        marginBottom: 20,

    },
    buttonContainer: {
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        width: '95%',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',


    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Poppins'

    },

    buyHead: {
        fontSize: 20,
        fontFamily: 'Poppins',
        marginBottom:20
    },
    buySubContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom:30

    },
    subImageContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    subImage: {
        width: 30,
        height: 30,
        marginRight:10
    },
    subHeadContainer:{
        width:'80%'

    },
    subHead:{
        fontSize: 17,
        fontFamily: 'Poppins',

    },
    subText:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color:'grey'

    },

})

export default Assets