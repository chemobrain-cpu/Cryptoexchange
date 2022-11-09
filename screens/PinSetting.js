import React,{useEffect,useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import {Feather } from '@expo/vector-icons';
import Loader from '../loaders/Loader';



const PinSetting = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    })

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
    
    const changePinHandler = async () => {
        //navigating to the browser
        navigation.navigate('Password')
    }

    if(isLoading){
        return <Loader/>
    }

    return (<SafeAreaView style={styles.screen}>

        <View style={styles.navigationHeader}>

            <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                <Feather name="arrow-left" size={23} color="rgb(44, 44, 44)" />
                <Text style={styles.headerName}>Security pin</Text>
            </Pressable>


        </View>

        <View style={styles.phoneContainer}>
            <View style={styles.phoneIcon}>
                <Feather name="unlock" size={24} color="black" />
            </View>

            <Text style={styles.phoneNumber}>
                ****
            </Text>

        </View>

        <Pressable style={styles.changePhone} onPress={changePinHandler}>
            <Text style={styles.changePhoneText}>Change security pin</Text>
        </Pressable>

    </SafeAreaView>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 20
    },
    /* styling header */
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30


    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 19,
        marginLeft: '20%',


    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },
    phoneContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:15

    },
    phoneNumber:{
        fontSize:25,
        marginLeft:12
    },

    changePhone:{
        width: '90%',
        paddingVertical: 18,
        backgroundColor: 'rgb(240,240,240)',
        borderColor: 'rgb(230,230,230)',
        borderRadius: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginRight: '5%',
        marginLeft: '5%',
        borderWidth: 1,

    },
    changePhoneText:{
        fontSize: 15,
        fontFamily: 'Poppins',

    }









});

export default PinSetting