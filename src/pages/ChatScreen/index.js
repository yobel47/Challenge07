import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { DummyProfile } from '../../assets';
import { Header } from '../../component';
import { colors, onLogScreenView } from '../../utils';

function ChatScreen({ navigation }) {
  useEffect(() => {
    onLogScreenView('ChatScreen');
  }, []);
  return (
    <View style={styles.page}>
      <Header type="dark-profile" title="Mandi" photo={DummyProfile} desc="tidur" onPress={() => navigation.goBack()} />

    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
