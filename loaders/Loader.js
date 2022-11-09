import React from "react";
import {
    StyleSheet,
    ActivityIndicator,
    View
} from "react-native";

const AppLoader = () => {

    return (<View style={styles.screen}>

        <ActivityIndicator size="small" color="blue" />

    </View>

    );
};

let styles = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default AppLoader;