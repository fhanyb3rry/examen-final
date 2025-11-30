import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';

interface Props {

    titulo: string;
    contenido: string;
    colorFondo?: string;

}

export const DataCard = ({ titulo, contenido, colorFondo = colors.blanco }: Props) => {

    return(

        <View style={{

            ...style.card,
            backgroundColor: colorFondo

        }}>

            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.contenido}>{contenido}</Text>

        </View>
    );
}

const style = StyleSheet.create({

    card: {

        padding: 16,
        borderRadius: 8,
        margin: 8,
        borderWidth: 1,
        borderColor: colors.gris_texto

    },

    titulo: {

        fontSize: 16,
        fontWeight: 'bold',
        color: colors.negro_texto,
        marginBottom: 8

    },

    contenido: {

        fontSize: 14,
        color: colors.gris_texto

    }

});