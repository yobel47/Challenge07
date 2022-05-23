import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';
import {
  ButtonComponent, Gap, Header, Input, Profile,
} from '../../component';
import { databaseRef } from '../../config';
import {
  colors, getData, onLogScreenView, showError, storeData,
} from '../../utils';

export default function UpdateProfile({ navigation }) {
  const [profile, setProfile] = useState({
    fullname: '',
    bio: '',
    email: '',
    photoForDB: '',
  });

  const [photo, setPhoto] = useState(ILNullPhoto);

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });

    onLogScreenView('UpdateProfileScreen');
  }, []);

  const update = () => {
    // console.log('profle :', profile);
    // console.log('New Password : ', password);
    updateProfileData();
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = profile.photoForDB;
    delete data.photoForDB;
    databaseRef()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        // console.log('success : ', data);
        storeData('user', data).then(() => {
          navigation.replace('DashboardScreen');
        });
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const onChangeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true,
      },
      (response) => {
        // console.log('response : ', response);
        if (response.didCancel || response.error) {
          showError('Sepertinya anda tidak memilih fotonya');
        } else {
          const source = response?.assets[0];
          // console.log('response GetImage : ', source);
          const Uri = { uri: source.uri };
          setProfile({
            ...profile,
            photoForDB: `data:${source.type};base64, ${source.base64}`,
          });
          setPhoto(Uri);
        }
      },
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Profile isRemove photo={photo} onPress={getImage} />
        <Gap height={26} />
        <Input
          label="Full Name"
          value={profile.fullname}
          onChangeText={(value) => onChangeText('fullname', value)}
        />
        <Gap height={24} />
        <Input
          label="Bio"
          value={profile.bio}
          onChangeText={(value) => onChangeText('bio', value)}
        />
        <Gap height={24} />
        <Input label="Email" value={profile.email} disable visible={false} editable={false} selectTextOnFocus={false} cannotEdited />
        <Gap height={24} />
        <Gap height={40} />
        <ButtonComponent title="Save Profile" onPress={update} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: 40,
    paddingTop: 0,
    backgroundColor: colors.background.primary,
  },

  page: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },

  text: {
    textFamily: 'Nunito-Bold',
    fontSize: 20,
  },
});
