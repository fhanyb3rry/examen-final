import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props{

    titulo: string;
    position: 'button_left' | 'button_right';
    action: () => void;

}

export const Fab = ({ titulo, position, action }: Props) => {

    return (
        <TouchableOpacity
            style={[
                styles.fab,
                position === 'button_left' ? styles.left : styles.right
            ]}
            onPress={action}
        >
            <Text style={styles.fabText}>{titulo}</Text>
            </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  fabText: {color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
