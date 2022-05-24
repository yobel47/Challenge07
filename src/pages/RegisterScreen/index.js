import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard, StyleSheet,
  Text, TouchableOpacity, TouchableWithoutFeedback, View,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { ButtonComponent, Input, LinkComponent } from '../../component';
import { databaseRef, register } from '../../config';
import { setLoading } from '../../redux';
import {
  colors,
  fonts,
  onLogScreenView, showError, showSuccess, storeData, useForm, windowHeight, windowWidth,
} from '../../utils';

function RegisterScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);
  const [form, setForm] = useForm({
    email: '',
    password: '',
    fullname: '',
    bio: '',
  });
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState(ILNullPhoto);
  const [hasPhoto, setHasPhoto] = useState(false);

  const [emailCorrect, setEmailCorrect] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [fullNameEmpty, setFullNameEmpty] = useState(false);

  const validateEmail = (text) => {
    if (text === '') {
      setEmailEmpty(true);
      setForm('email', '');
    } else {
      setForm('email', text);
      const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmailCorrect(true);
        setEmailEmpty(false);
        setForm('email', text);
      } else {
        setEmailCorrect(false);
        setForm('email', text);
      }
    }
  };

  const validatePassword = (text) => {
    if (text === '') {
      setPasswordEmpty(true);
      setForm('password', '');
    } else {
      setForm('password', text);
      if (text.length < 6) {
        setPasswordCorrect(true);
        setPasswordEmpty(false);
        setForm('password', text);
      } else {
        setPasswordCorrect(false);
        setForm('password', text);
      }
    }
  };

  const validateFullName = (text) => {
    if (text === '') {
      setFullNameEmpty(true);
      setForm('fullname', '');
    } else {
      setFullNameEmpty(false);
      setForm('fullname', text);
    }
  };

  const validateBio = (text) => {
    setForm('bio', text);
  };

  useEffect(() => {
    onLogScreenView('RegisterScreen');
  }, []);

  const onRegister = () => {
    dispatch(setLoading(true));
    register(form.email, form.password)
      .then((res) => {
        const data = {
          fullname: form.fullname,
          email: form.email,
          bio: form.bio,
          uid: res.user.uid,
          photo: photoForDB,
        };

        const dataLocal = {
          fullname: form.fullname,
          email: form.email,
          uid: res.user.uid,
          bio: form.bio,
          password: form.password,
        };
        dispatch(setLoading(false));
        setForm('reset');
        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .set(data);

        storeData('user', dataLocal);
        showSuccess('Register Success');
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err.code === 'auth/email-already-in-use') {
          showError('That email address is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
        showError(err.message);
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
          setPhotoForDB(`data:${source.type};base64, ${source.base64}`);
          const Uri = { uri: source.uri };
          setPhoto(Uri);
          setHasPhoto(true);
        }
      },
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={{ flex: 1, height: 185 }}>
          <View style={{ flex: 1, width: null, backgroundColor: colors.background.secondary }} />
          <View style={styles.profile}>
            <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
              <Image source={photo} style={styles.avatar} />
              {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
              {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.RegisterText}>Register</Text>
          <Input label="Full Name" onChangeText={(text) => validateFullName(text)} value={form.fullname} visible={fullNameEmpty} />
          <Input label="Bio" onChangeText={(text) => validateBio(text)} value={form.bio} />
          <Input label="Email" onChangeText={(text) => validateEmail(text)} value={form.email} visible={emailCorrect} errorType={emailEmpty} />
          <Input
            label="Password"
            onChangeText={(text) => validatePassword(text)}
            value={form.password}
            visible={passwordCorrect}
            errorType={passwordEmpty}
          />
          <ButtonComponent title="Register" label="Register" onPress={() => onRegister()} disable={!(form.password && form.email) || stateGlobal.isLoading} />
          <View style={styles.goLoginWrapper}>
            <Text style={styles.loginTitle}>
              Already have an account?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Login" color={colors.text.secondary} size={16} onPress={() => navigation.replace('LoginScreen')} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    backgroundColor: colors.background.secondary,
  },
  titleText: {
    position: 'absolute',
    top: windowHeight * 0.1,
    alignSelf: 'center',
    color: colors.text.primary,
    fontFamily: 'SourceSansProBold',
    fontSize: 60,
    shadowColor: colors.background.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  linkWrapper: {
    alignItems: 'flex-end',
    marginLeft: windowWidth / 2,
  },
  bottomView: {
    backgroundColor: colors.background.primary,
    opacity: 0.95,
    // position: 'absolute',
    flexGrow: 1,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  RegisterText: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: colors.text.black,
  },

  goLoginWrapper: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.black,
  },
  profile: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
