import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

interface Props {
    titulo: string;
    onPress: () => void;
}

export const PrimaryButton = ({ titulo, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{titulo}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.azul,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8
    },
    text: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: 'bold'
    }
});