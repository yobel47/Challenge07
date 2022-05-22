import React from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { ButtonComponent } from '../../atoms';
import { colors, fonts } from '../../../utils';

export default function InputChat({
  value, onChangeText, onButtonPress, targetChat,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${targetChat.fullname}`}
        value={value}
        onChangeText={onChangeText}
      />
      <ButtonComponent type="btn-icon-send" onPress={onButtonPress} disable={value.length < 1} />
      <Text />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.White,
  },
  input: {
    backgroundColor: colors.disable.background,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontFamily: fonts.primary.normal,
    fontSize: 14,
    maxHeight: 45,
  },
});
