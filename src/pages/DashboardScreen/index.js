/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { ILNullPhoto } from '../../assets';
import { ButtonComponent, Header, List } from '../../component';
import { databaseRef } from '../../config/Firebase';
import { colors, getData, onLogScreenView } from '../../utils';

function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });

  const [allUser, setallUser] = useState([]);

  const getChatList = (uid) => {
    databaseRef().ref(`chatlist/${uid}/`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const array = Object.values(snapshot.val());
          const sortedArray = array.sort((a, b) => new Date(b.sendTime)
            .getTime() - new Date(a.sendTime)
            .getTime());
          const dataMsgNotNull = sortedArray.filter((it) => it.lastMsg !== '');
          setallUser(
            dataMsgNotNull,
          );
        }
      });
  };

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
      getChatList(res.uid);
    });
  };

  useEffect(() => {
    onLogScreenView('DashboardScreen');
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createChatList = (data) => {
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
          databaseRef()
            .ref(`/chatlist/${profile.uid}/${data.uid}`)
            .update({
              ...snapshot.val(), photo: data.photo, fullname: data.fullname, bio: data.bio,
            });
          navigation.navigate('ChatScreen', {
            receiverData: {
              ...snapshot.val(), photo: data.photo, fullname: data.fullname, bio: data.bio,
            },
            profile,
          });
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
            chat={item.lastMsg}
            profile={item.photo}
            date={moment(item.sendTime).format('YYYY/MM/DD')}
            time={moment(item.sendTime).format('HH:mm a')}
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
