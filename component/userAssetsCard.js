import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import {truncate} from "../utils/util"


let UserAssetCard = ({ navigationHandler, coin,user }) => {
   
    //destructuring the coin datastructure
    
    let { image, name, id, symbol,current_price } = coin

    
    
   
    return <TouchableOpacity 
    key={id} style={{ ...styles.cryptoContainer, backgroundColor: user.currentWallet.id == symbol ? 'rgb(240,240,240)' : '#fff' }}
     onPress={(user)=>navigationHandler({id:id,user:user,symbol:symbol,url:image})}  
     >
        <View style={styles.containerLeft} >
            <Image
                source={{ uri: image }}
                style={styles.imageLogo}
            />
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{truncate(name, 7)}</Text>
                <Text style={styles.symbolText}>{symbol.toUpperCase()}</Text>

            </View>
        </View>

        <View style={styles.containerRight}>
            <View style={styles.innerContainerRight}>
               
                {user.currentWallet.id === id.toLowerCase()?<Text style={styles.priceText}>$0.00</Text>:<Text style={styles.priceText}>$0.00</Text>}
                <Text style={{ ...styles.iconText, color: 'rgb(100,100,100)' }}>{symbol.toUpperCase()}</Text>

            </View>

            {user.currentWallet.id === id.toLowerCase() && <AntDesign name="check" size={24} color="#1652f0" />}
        </View>

    </TouchableOpacity>
}

const styles = StyleSheet.create({

    cryptoContainer: {
        paddingVertical: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",

    },
    containerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '50%',

    },
    containerRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
    },
    innerContainerRight: {
        width: '60%',
        display: 'flex',
        alignContent: 'flex-start',
        marginRight: 5



    },
    imageLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: "#ddd",
    },
    nameContainer: {
        flex: 1,
        paddingLeft: 10
    },
    nameText: {
        fontSize: 16,
        fontFamily: 'Poppins'
    },
    symbolText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: "#5d616d"
    },
    priceText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        alignSelf: 'flex-end'
    },
    iconText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: "#5d616d",
        alignSelf: 'flex-end'
    }

})



export default UserAssetCard