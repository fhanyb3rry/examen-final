import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../themes/colors';

interface Props {

    titulo: string;
    color: string;
    action: () => void;

}

export const PrimaryButton = ({ titulo, color, action }: Props) => {
    return(

        <TouchableOpacity onPress={() => action()}>
            <View style = {{

            ...style.btn,
            backgroundColor: color

        }}>

                <Text style={style.text}>{titulo}</Text>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create ({

    btn: {
        alignContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: colors.azul,
        height: 50,
        justifyContent: "center",
        margin: 5,
        width: 200,
    },

    text: {

        color: "white",
        fontSize: 20,
    }
});