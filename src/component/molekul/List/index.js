/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import {
  IconEditProfile,
  IconHelp,
  IconLanguage,
  IconNext,
  IconRate,
  ILNullPhoto,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

export default function List({
  profile, name, chat, type, onPress, icon, desc, time, date,
}) {
  function Icon() {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'help') {
      return <IconHelp />;
    }
    return <IconEditProfile />;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : (
        <Image
          source={profile.length > 1 ? { uri: profile }
            : ILNullPhoto}
          style={styles.imageStyle}
        />
      )}
      <View style={styles.titleWrapper}>
        <Text style={styles.names}>{name}</Text>
        <Text style={styles.chat}>{chat}</Text>
        <Text style={styles.chat}>{desc}</Text>
      </View>
      {type === 'next' && <IconNext />}
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.time}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  imageStyle: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },

  names: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
  },

  chat: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.subtitle,
    textTransform: 'capitalize',
  },

  time: {
    color: colors.text.subtitle,
    fontSize: 12,
    fontFamily: fonts.primary[600],
  },
});
