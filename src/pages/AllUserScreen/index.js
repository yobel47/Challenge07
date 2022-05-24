/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ILNullPhoto } from '../../assets';
import List from '../../component/molekul/List';
import { databaseRef } from '../../config/Firebase';
import { getData, onLogScreenView } from '../../utils';

function AllUserScreen({ navigation }) {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
    uid: '',
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    console.log(query);
    setSearchQuery(query);
    getAllUser(profile.uid,query);
  }
  const [allUser, setallUser] = useState([]);

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
      getAllUser(res.uid,'');
    });
  };

  const getAllUser = (uid,text) => {
    databaseRef()
      .ref('users/')
      .once('value')
      .then((snapshot) => {
        setallUser(
          Object.values(snapshot.val()).filter((it) => ((it.fullname).toLowerCase().includes(text))&&((it.uid) !== uid)),
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
          navigation.navigate('ChatScreen', {
            receiverData: snapshot.val(),
            profile,
          });
        }
      });
  };

  useEffect(() => {
    // getAllUser();
    onLogScreenView('AllUserScreen');
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.page}>
      <Searchbar
        style={{
          marginHorizontal: 8, borderRadius: 25, marginTop: 10, marginBottom: 15,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
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
    </View>
  );
}

export default AllUserScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
