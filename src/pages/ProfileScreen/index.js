import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Gap, Header, List, Profile,
} from '../../component';
import {
  colors, onLogScreenView, removeData, showError,
} from '../../utils';

export default function ProfileScreen({ navigation, route }) {
  const profile = route.params;
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        removeData('user').then(() => navigation.replace('LoginScreen'));
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  useEffect(() => {
    onLogScreenView('ProfileScreen');
  }, []);

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullname.length > 0 && (
        <Profile name={profile.fullname} desc={profile.bio} photo={profile.photo} />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        chat="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      {/* <List name="Language" chat="Avaible in 12 Languages" type="next" icon="Language" />
      <List name="Give Us Rate" chat="On Google Play Store" type="next" icon="rate" /> */}
      <List
        name="Sign Out"
        chat="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },
});
