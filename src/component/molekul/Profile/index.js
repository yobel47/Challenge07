import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { IconRemovePhoto } from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function Profile({
  name, desc, isRemove, photo, onPress,
}) {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </View>
      )}

      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View style={styles.textTitle}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{desc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  borderProfile: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 130 / 2,
    justifyContent: 'center',
    borderColor: colors.border,
    alignItems: 'center',
  },

  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    alignSelf: 'center',
  },
  textTitle: {
    alignItems: 'center',
    marginTop: 16,
  },
  name: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.text.black,
    textTransform: 'capitalize',
  },
  job: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.text.subtitle,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
});
