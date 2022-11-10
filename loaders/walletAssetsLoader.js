import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons';
import ContentLoader, { Rect } from 'react-content-loader/native'

let WalletAssetLoader = ({ navigation, title }) => {
    let [text,setText] = useState('')

    return <SafeAreaView style={styles.screen}>
        <ScrollView stickyHeaderIndices={[0]}>

            <View style={styles.headerContainer}>
                <View style={styles.assetsheaderCon}>
                    <TouchableOpacity style={styles.headerIconCon} >
                        <Feather name="arrow-left" size={25} color={"rgb(44,44,44)"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerTextCon} onPress={() => navigation.goBack()}>
                        <Text style={styles.headerText}>{title}</Text>
                    </TouchableOpacity>


                </View>
                <View style={styles.searchCon}>

                    <KeyboardAvoidingView style={{ ...styles.inputContainer }}>
                        <FontAwesome name="search" size={18} color={"black"} />
                        <TextInput
                            style={{ ...styles.input, borderColor: 'orange' }}
                            value={text}
                            placeholder="Search"


                        />
                    </KeyboardAvoidingView>

                </View>
            </View>

            <View style={styles.loaderContainer}>

                <ContentLoader 
                duration={1000}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#fff"
                    height={50}
                     >
                    <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />
                </ContentLoader>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'35%'} duration={1000} borderRadius={40}
                        backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'50%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'50%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'20%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

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
                    <ContentLoader height={40} width={'35%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'50%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>
                <View style={styles.container}>
                    <ContentLoader height={40} width={'35%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

                <View style={styles.container}>
                    <ContentLoader height={40} width={'30%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>
                    <ContentLoader height={50} width={'50%'} duration={1000} borderRadius={40} backgroundColor="#f3f3f3"
                        foregroundColor="#fff">

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />

                    </ContentLoader>
                </View>


            </View>

        </ScrollView>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        paddingTop: 15,
        paddingHorizontal: 20,

    },

    headerText: {
        fontSize: 21,
        fontFamily: 'ABeeZee',
        marginLeft: '5%'
    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10
    },
    searchCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    inputContainer: {
        width: '90%',
        borderRadius: 25,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderColor: 'rgb(180,180,180)',
        height: 50

    },
    input: {
        paddingHorizontal: 10,
        fontFamily: 'ABeeZee',
        marginBottom: 5,
        alignSelf: 'stretch',
        width: '90%',
        fontSize: 17,

    },
    /*end of header section style*/
    loaderContainer: {
        paddingHorizontal: 15,
        width: Dimensions.get('window').width,
        flex: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

})

export default React.memo(WalletAssetLoader)