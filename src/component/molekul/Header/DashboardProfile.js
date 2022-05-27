import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { chatIcon } from '../../../assets';
import { colors, fonts } from '../../../utils';

function DashboardProfile({ photo, title, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.icon} source={chatIcon} />
        <Text style={styles.name}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.avaWrapper} onPress={onPress}>
        <Image source={photo} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,

  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -5,
  },

  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },

  name: {
    fontSize: 23,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
    fontWeight: 'bold',
    marginTop: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  avaWrapper: {
    borderWidth: 1,
    borderRadius: 46 / 2,
  },
});
