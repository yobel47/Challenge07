import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { onLogScreenView } from '../../utils';

function ChatScreen() {
  useEffect(() => {
    onLogScreenView('ChatScreen');
  }, []);
  return (
    <View style={styles.page}>
      <Text>ChatScreen tim 22</Text>
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
