/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { fonts, colors } from '../../../utils';

function Input({
  label, value, onChangeText, visible, disable,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  if (label === 'Email') {
    return (
      <View>
        <TextInput
          mode="outlined"
          label={label}
          value={value}
          disabled={disable}
          onChangeText={onChangeText}
          activeOutlineColor={colors.lineTextInput}
          style={styles.input}
          keyboardType="email-address"
          outlineColor={colors.outlineInput}
          left={(
            <TextInput.Icon name="email" />
            )}
        />

        <HelperText type="error" visible={visible}>
          Email Required
        </HelperText>
      </View>
    );
  }
  if (label === 'password') {
    return (
      <View>
        <TextInput
          label={label}
          value={value}
          mode="outlined"
          onChangeText={onChangeText}
          secureTextEntry={passwordVisible}
          activeOutlineColor={colors.lineTextInput}
          outlineColor={colors.outlineInput}
          style={styles.input}
          left={(
            <TextInput.Icon name="key" />
            )}
          right={(
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={passwordVisible ? colors.background.secondary : colors.warning}
            />
              )}
        />
        <HelperText type="error" visible={visible}>
          Password Required
        </HelperText>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        style={styles.input}
        label={label}
        value={value}
        onChangeText={onChangeText}
        activeOutlineColor={colors.lineTextInput}
        disabled={disable}
        outlineColor={colors.outlineInput}
        left={(
          <TextInput.Icon name="account-circle" />
            )}
      />

    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
  },
});
