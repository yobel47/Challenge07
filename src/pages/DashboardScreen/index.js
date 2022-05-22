import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import { DummyProfile, ILNullPhoto } from '../../assets';
import { ButtonComponent, Header, List } from '../../component';
import { colors, getData, onLogScreenView } from '../../utils';

function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserData();
    });
    onLogScreenView('DashboardScreen');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  return (
    <View style={styles.page}>
      <Header type="dashboard-profile" title={profile.fullname} photo={profile.photo} onPress={() => navigation.navigate('ProfileScreen', profile)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <List
          type="next"
          profile={DummyProfile}
          name="Rehan"
          chat="baring"
          onPress={() => navigation.navigate('ChatScreen')}
        />
      </ScrollView>
      <ButtonComponent icon="account-multiple" type="floating-btn" onPress={() => navigation.navigate('AllUserScreen')} />
    </View>

  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

});
