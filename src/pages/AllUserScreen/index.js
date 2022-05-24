import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {ILNullPhoto} from '../../assets';
import List from '../../component/molekul/List';
import {databaseRef} from '../../config/Firebase';
import {getData, onLogScreenView} from '../../utils';

function AllUserScreen() {
  useEffect(() => {
    getAllUser();
    onLogScreenView('AllUserScreen');
    getUserData();
  }, []);

  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullname: '',
    bio: '',
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [allUser, setallUser] = useState([]);

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };
  const getAllUser = () => {
    databaseRef()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        setallUser(
          Object.values(snapshot.val()).filter(it => it.uid !== profile.uid),
        );
      });
  };
  const createChatList = data => {
    // console.log('data', data);
    databaseRef()
      .ref(`/chatlist/${profile.uid}/${data.uid}`)
      .once('value')
      .then(snapshot => {
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

          navigation.navigate('ChatScreen', {receiverData: data, profile});
        } else {
          navigation.navigate('ChatScreen', {
            receiverData: snapshot.val(),
            profile,
          });
        }
      });
  };

  return (
    <View style={styles.page}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(Item, index) => index.toString()}
        data={allUser}
        renderItem={({item}) => (
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
  
  },
});
