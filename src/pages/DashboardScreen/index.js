/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { ILNullPhoto } from '../../assets';
import { ButtonComponent, Header, List } from '../../component';
import { databaseRef } from '../../config/Firebase';
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

  const createChatList = (data) => {
    // console.log('data', data);
    databaseRef()
      .ref(`/chatlist/${profile.uid}/${data.uid}`)
      .once('value')
      .then((snapshot) => {
        // console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          const roomId = uuid.v4();
          const myData = {
            roomId,
            uid: profile.uid,
            fullname: profile.fullname,
            photo: profile.photo,
            bio: profile.bio,
            lastMsg: '',
          };
          databaseRef()
            .ref(`/chatlist/${data.uid}/${profile.uid}`)
            .update(myData);
          // .then(() => console.log('Data updated.'));

          data.lastMsg = '';
          data.roomId = roomId;
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update(data);
          // .then(() => console.log('Data updated.'));

          navigation.navigate('ChatScreen', { receiverData: data, profile });
        } else {
          navigation.navigate('ChatScreen', { receiverData: snapshot.val(), profile });
        }
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
            onPress={() => createChatList(item)}
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
