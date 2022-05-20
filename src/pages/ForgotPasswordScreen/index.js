import React, { useEffect } from 'react';
import {
  Keyboard, StyleSheet,
  Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { IconApp2 } from '../../assets';
import {
  ButtonComponent, Gap, Input, LinkComponent,
} from '../../component';

import { forgetPassword } from '../../config';
import { setLoading } from '../../redux';
import {
  colors, fonts, onLogScreenView, showError, showSuccess, useForm, windowHeight, windowWidth,
} from '../../utils';

function ForgotPasswordScreen({ navigation }) {
  const stateGlobal = useSelector((state) => state);
  const [form, setForm] = useForm({
    email: '',
  });
  const dispatch = useDispatch();

  const validateEmail = (text) => {
    setForm('email', text);
  };

  useEffect(() => {
    onLogScreenView('ForgotPasswordScreen');
  }, []);

  const onSendEmail = () => {
    dispatch(setLoading(true));
    forgetPassword(form.email).then(() => {
      dispatch(setLoading(false));
      showSuccess('Please check your email');
      navigation.navigate('LoginScreen');
    }).catch((err) => {
      dispatch(setLoading(false));
      showError(err.message);
    });
  };

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
          <Text style={styles.ForgotText}>Forgot Password ?</Text>
          <Input label="Email" onChangeText={(text) => validateEmail(text)} value={form.email} visible={form.email.length <= 0} />
          <Gap height={100} />
          <ButtonComponent title="Send Email" label="Send Email" onPress={() => onSendEmail()} disable={!(form.email) || stateGlobal.isLoading} />
          <View style={styles.goLoginWrapper}>
            <Text style={styles.LoginTitle}>
              Back to Login?
              {' '}
            </Text>
            <LinkComponent disable={stateGlobal.isLoading} title="Login" color={colors.text.secondary} size={16} onPress={() => navigation.replace('LoginScreen')} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  ForgotText: {
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
  LoginTitle: {
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

});
