import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import {
  Keyboard, StyleSheet,
  Text, TouchableWithoutFeedback, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { IconApp2, ILNullPhoto } from '../../assets';
import {
  ButtonComponent, Gap, Input, LinkComponent,
} from '../../component';
import { databaseRef, login, signInSocialMedia } from '../../config';
import { setLoading } from '../../redux';
import {
  colors,
  fonts,
  onLogScreenView, showError, showSuccess, storeData, useForm, windowHeight, windowWidth,
} from '../../utils';

function LoginScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);
  const dispatch = useDispatch();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const validateEmail = (text) => {
    setForm('email', text);
  };

  const validatePassword = (text) => {
    setForm('password', text);
  };

  useEffect(() => {
    onLogScreenView('LoginScreen');
    GoogleSignin.configure({
      webClientId: '1066886720284-g0804fhtkpmu2t7km96tkdhjpm2ecdec.apps.googleusercontent.com',
    });
  }, []);

  const loginUser = () => {
    dispatch(setLoading(true));
    login(form.email.trim(), form.password)
      .then((res) => {
        dispatch(setLoading(false));
        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            analytics().logEvent('Login', {
              method: 'Email_Password',
            });
            analytics().setUserId(resDB.val().uid);
            analytics().setUserProperty('Login_with', 'Email_Password');
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('DashboardScreen');
              showSuccess('Login Success');
            }
          });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        if (err.code === 'auth/invalid-email') {
          showError('That email address is invalid!');
        }
        showError(err.message);
      });
  };

  async function onGoogleButtonPress() {
    dispatch(setLoading(true));
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return signInSocialMedia(googleCredential);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, width: null, backgroundColor: colors.background.secondary }} />
        </View>
        <Animatable.View
          style={styles.animation}
          animation="fadeInUp"
          delay={1200}
        >
          <IconApp2 width={windowWidth * 0.27} height={windowHeight * 0.15} />
          <Text style={styles.animationText}>MyChatting</Text>
        </Animatable.View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Login</Text>
          <Input label="Email" onChangeText={(text) => validateEmail(text)} value={form.email} visible={form.email.length <= 0} />
          <Input
            label="password"
            onChangeText={(text) => validatePassword(text)}
            value={form.password}
            visible={form.password.length <= 0}
          />

          <View style={styles.linkWrapper}>
            <LinkComponent
              title="Forgot Password?"
              color={colors.text.secondary}
              size={16}
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              align="right"
            />
          </View>
          <View style={styles.iconWrapper}>
            <ButtonComponent
              iconHeight={25}
              iconWidth={25}
              type="icon-button"
              label="Google"
              onPress={() => onGoogleButtonPress().then((res) => {
                analytics().logEvent('Login', {
                  method: 'Google',
                });
                analytics().setUserId(res.user.uid);
                analytics().setUserProperty('Login_with', 'Google');
                const data = {
                  fullname: res.user.displayName,
                  email: res.user.email,
                  uid: res.user.uid,
                  photo: ILNullPhoto,
                  bio: 'null',
                };
                dispatch(setLoading(false));
                showSuccess('Login Sukses');
                navigation.replace('DashboardScreen');
                databaseRef()
                  .ref(`users/${res.user.uid}/`)
                  .set(data);
                storeData('user', data);
              })
                .catch((err) => {
                  dispatch(setLoading(false));
                  showError(err.message);
                })}

            />
          </View>
          <Gap height={30} />
          <ButtonComponent title="Login" onPress={() => loginUser()} disable={!(form.password && form.email) || stateGlobal.isLoading} />
          <View style={styles.goRegisterWrapper}>
            <Text style={styles.registerTitle}>
              Don&lsquo;t have an account?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Register" color={colors.text.secondary} size={16} onPress={() => navigation.replace('RegisterScreen')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: windowHeight * 0.1,
    alignSelf: 'center',

  },
  linkWrapper: {
    alignItems: 'flex-end',
    marginLeft: windowWidth / 2,
    marginTop: -12,
  },
  bottomView: {
    backgroundColor: colors.background.primary,
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
    color: colors.text.black,
  },

  loginButton: {
    backgroundColor: colors.text.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.black,
  },
  fpText: {
    marginTop: -10,
    alignSelf: 'flex-end',
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.secondary,
  },
  goRegisterWrapper: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.black,
  },

  animation: {
    position: 'absolute',
    top: windowHeight * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  animationText: {
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
    fontSize: 30,
    shadowColor: colors.background.secondary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  iconWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },

});
