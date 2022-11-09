import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { View, SafeAreaView, ScrollView,  StyleSheet,Dimensions} from 'react-native'



let SplashLoader = () => {
    
    return <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}  stickyHeaderIndices={[0]}>
        
        <View style={styles.contentContainer}>

            <ContentLoader backgroundColor="#f3f3f3"
                foregroundColor="#fff" height={50} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />


            </ContentLoader>
            <ContentLoader backgroundColor="#f3f3f3"
                foregroundColor="#fff" height={100} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={200} backgroundColor="#f3f3f3"
                foregroundColor="#fff">

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='30%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='45%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>
                <ContentLoader height={50} width='40%' duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                </ContentLoader>

            </View>
            <ContentLoader height={80} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={50} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={60} duration={1000}>

                <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


            </ContentLoader>
            <ContentLoader height={50} duration={1000}>

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
        paddingBottom: 100,

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
    contentContainer:{ 
        flex: 1, 
        backgroundColor: '#fff', 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height,paddingHorizontal:17,
        paddingTop:40 
    }
})



export default SplashLoader;