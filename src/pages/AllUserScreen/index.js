import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { onLogScreenView } from '../../utils';

function AllUserScreen() {
  useEffect(() => {
    onLogScreenView('AllUserScreen');
  }, []);
  return (
    <View style={styles.page}>
      <Text>AllUserScreen</Text>
    </View>
  );
}

export default AllUserScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
