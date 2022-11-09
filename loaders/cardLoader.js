import React  from 'react'
import { View,TouchableOpacity, StyleSheet} from 'react-native'
import { Card } from "react-native-shadow-cards"
import ContentLoader, { Rect } from 'react-content-loader/native'


let CryptoCard = () => {
    

    return <TouchableOpacity>
        <Card 
            style={styles.cardContainer}>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'20%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'60%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'45%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'50%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff" >

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

        </Card>

    </TouchableOpacity>
}

const styles = StyleSheet.create({

    cardContainer: {
        width: 180,
        height: 160,
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 10,
        marginRight: 15,
        paddingHorizontal: 15,

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


})



export default CryptoCard