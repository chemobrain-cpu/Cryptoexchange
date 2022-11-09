import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable,Image } from 'react-native'
import { Feather,Ionicons } from '@expo/vector-icons';
import moment from 'moment'


const GiftNotification = ({ topic,date,text,price,trade }) => {
    const [header, setHeader] = useState(false);


    return (<View style={styles.notificationContainer}>
        <Pressable onPress={()=>trade()} style={styles.innerLeft}>
            <View style={styles.topicContainer}>
                <Text style={styles.topic}><Ionicons name="notifications" size={24} color="rgb(100,100,100)" /></Text>
                <Text style={styles.time}>{moment(date).from(moment())}</Text>

            </View>
            <View style={styles.aboutTextCon}>

               
                <View style={styles.aboutTextCon}>

            
                    <Text style={styles.aboutBottomText}>
                    {text}

                    </Text>

                </View>

            </View>
            <TouchableOpacity style={styles.actionButton} onPress={()=>trade()}>
                <Text style={styles.buttonText}>Start trading</Text>
                <Feather name="arrow-right" size={24} color="rgb(44, 44, 44)" />

            </TouchableOpacity>

        </Pressable>
     



    </View>
    )
}

const styles = StyleSheet.create({

    notificationContainer: {
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        paddingVertical: 25,
        borderBottomWidth:.5,
        borderBottomColor:'rgb(230,230,230)',
        paddingVertical:35

    },
    innerLeft: {
        width: '80%'

    },
    topicContainer: {
        display: 'flex',
        flexDirection: 'row',

    },
    topic: {
        fontSize: 18,
        fontFamily: 'Poppins',
        paddingLeft:10

    },

    time: {
        fontSize: 18,
        fontFamily: 'Poppins',
        marginLeft: 15

    },
    aboutTextCon: {
        display: 'flex',
        paddingLeft:5

    },
    aboutTopText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        marginBottom: 10,
        
        

    },
    aboutBottomText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        marginBottom: 10
        
        

    },
    actionButton: {
        paddingHorizontal: 13,
        paddingVertical: 17,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(245,245,245)'



    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Poppins',


    },
    buttonTextPercent: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'red',
        marginLeft: 10

    },
    innerRight: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center"
    },
    rightTopText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',

    },
    rightBottomText: {
        fontSize: 18,
        fontFamily: 'ABeeZee',
        color: 'red',

    }



})

export default GiftNotification