import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';

export const LoadingSpinner = () => {

    return (

        <View style={style.container}>
            <ActivityIndicator size="large" color={colors.azul} />
        </View>

    );

}

const style = StyleSheet.create ({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }

});
