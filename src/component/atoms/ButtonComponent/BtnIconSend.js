import React from 'react';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { IconSendDark, IconSendLight } from '../../../assets';
import { colors } from '../../../utils';

export default function BtnIconSend({ disable, onPress }) {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <IconSendDark />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (disable) => ({
    backgroundColor: disable ? colors.disable.background : colors.tertiary,
    height: 46,
    width: 46,
    paddingRight: 3,
    paddingTop: 3,
    paddingLeft: 8,
    paddingBottom: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
  }),
});
