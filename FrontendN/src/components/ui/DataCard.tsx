import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

interface Props {
    titulo: string;
    contenido: string;
}

export const DataCard = ({ titulo, contenido }: Props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.contenido}>{contenido}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.blanco,
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.gris_texto
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.negro,
        marginBottom: 8
    },
    contenido: {
        fontSize: 14,
        color: colors.gris_texto,
        lineHeight: 20
    }
});