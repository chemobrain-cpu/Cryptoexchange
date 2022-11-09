import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';


const Privacy = ({ navigation }) => {


    const continueHandler = async() => {
        //navigating to the browser
         //navigate to password reset page
         await WebBrowser.openBrowserAsync('http://www.coincap.cloud/policy')


    }

    return (<SafeAreaView style={styles.screen}>
        <View style={styles.container}>


            <View style={styles.navigationHeader}>

                <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                    <Feather name="arrow-left" size={23} color="rgb(44, 44, 44)" />
                    <Text style={styles.headerName}>Privacy</Text>
                </Pressable>


            </View>

            <Pressable style={styles.settingContainer} onPress={()=>continueHandler('privacy')}>
                <View>
                    <Text style={styles.settingText}>Privacy policy</Text>
                </View>
                <AntDesign name="right" size={18} color="rgb(44, 44, 44)" />

            </Pressable>

            <Pressable style={styles.settingContainer} onPress={()=>continueHandler('cookie')}>
                <View>
                    <Text style={styles.settingText}>Cookie policy</Text>
                </View>
                <AntDesign name="right" size={18} color="rgb(44, 44, 44)" />

            </Pressable>












        </View>

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
        marginLeft: '40%',


    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },

    settingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30

    },
    settingText: {
        fontSize: 18,
        fontFamily: 'ABeeZee'
    },








});

export default Privacy