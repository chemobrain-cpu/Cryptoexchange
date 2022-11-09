import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Entypo, MaterialIcons,Ionicons } from '@expo/vector-icons';


let PayLoader = () => {
    return <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
            <View >
                <View style={{ ...styles.headerContainer }}>
                    <TouchableOpacity >
                        <Entypo name="menu" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => alert('notification')}>
                        <Ionicons name="notifications" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#fff', width: Dimensions.get('window').width, height: Dimensions.get('window').height, paddingHorizontal: 17, }}>

                <ContentLoader backgroundColor="#f3f3f3"
                    foregroundColor="#fff"
                    height={150}
                    duration={1000}
                    width={'100%'}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />



                </ContentLoader>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'35%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={30} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>


                <View style={styles.container}>
                    <ContentLoader height={35} width={'10%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={35} width={'15%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={35} width={'20%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={35} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>





                <ContentLoader height={60} width={150} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />



                </ContentLoader>
                <ContentLoader height={200} width={200} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                    <Rect x="0" y="20" rx="5" ry="5" width="60%" height="50%" />
                    <Rect x="0" y="50" rx="5" ry="5" width="100%" height="50%" />


                </ContentLoader>


                <ContentLoader height={60} width={'100%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

                <ContentLoader height={120} width={'100%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                    foregroundColor="#fff">

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
        </ScrollView>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 10,
    },
    headerContainer: {
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 15

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color: '#1652f0',
        alignSelf: 'center'
    }
    ,
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
    container:{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    }
})


export default PayLoader;

