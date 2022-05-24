import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';

function DashboardProfile({ photo, title, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
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
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 46 / 2,
    marginRight: 8,
  },

  name: {
    fontSize: 22,
    fontFamily: fonts.primary[600],
    color: colors.text.black,
    fontWeight: 'bold',
  },

});
