import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import { ILNullPhoto } from '../../assets';
import { ButtonComponent, Header, List } from '../../component';
import { databaseRef } from '../../config/Firebase/index.js';
import { colors, getData, onLogScreenView } from '../../utils';

function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
  });

  const [allUser, setallUser] = useState([]);

  useEffect(() => {
    getAllUser();
    onLogScreenView('DashboardScreen');
    getUserData();
    // console.log('all user', allUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  const getAllUser = () => {
    databaseRef()
      .ref('users/')
      .once('value')
      .then((snapshot) => {
        setallUser(
          Object.values(snapshot.val()).filter((it) => it.uid !== profile.uid),
        );
      });
  };

  return (
    <View style={styles.page}>
      <Header type="dashboard-profile" title={profile.fullname} photo={profile.photo} onPress={() => navigation.navigate('ProfileScreen', profile)} />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(Item, index) => index.toString()}
        data={allUser}
        renderItem={({ item }) => (
          <List
            name={item.fullname}
            chat={item.bio}
            profile={item.photo}
            type="next"
            onPress={() => navigation.navigate('ChatScreen', item)}
          />
        )}
      />
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
