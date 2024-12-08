import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global';
import signupStyles from '../styles/signup';
import Heading from '../components/Heading';
import Input from '../components/AppInput';
import AppButton from '../components/AppButton';
import {
  validateCheckbox,
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from '../validations/signup';
import Checkbox from '../components/Checkout';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleSubmit = () => {
    const nameError = validateName(email);
    const usernameError = validateUsername(email);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const checkError = validateCheckbox(isChecked);

    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      !usernameError &&
      !checkError
    ) {
      Alert.alert('Form submitted!');
    } else {
      Alert.alert('Please fix the errors!');
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <View style={signupStyles.container}>
          <Image
            source={require('../assets/app_logo.png')}
            style={signupStyles.logo}
          />
        </View>
        <Heading level={3} weight="Bold">
          Create account
        </Heading>

        <View style={signupStyles.form}>
          <Input
            label="Majid Name"
            placeholder="Your majid name"
            value={name}
            onChangeText={setName}
            validation={validateName}
          />
          <Input
            label="Username"
            placeholder="Your name"
            value={username}
            onChangeText={setUsername}
            validation={validateEmail}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            validation={validateEmail}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            validation={validatePassword}
            secureTextEntry
          />
          <Checkbox
            label="I agree to the terms and conditions"
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <AppButton
            style={{marginTop: 20}}
            text="Sign Up"
            onPress={handleSubmit}
            variant="primary"
          />
          <View style={signupStyles.bottomCenter}>
            <Text style={signupStyles.bottomTextFirst}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={signupStyles.bottomTextSecond}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
