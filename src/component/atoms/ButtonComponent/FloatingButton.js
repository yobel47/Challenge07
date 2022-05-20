import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { colors } from '../../../utils';

function FloatingButton({ onPress, icon }) {
  return (
    <FAB
      style={styles.fab}
      icon={icon}
      onPress={onPress}
    />
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background.secondary,
  },
});
