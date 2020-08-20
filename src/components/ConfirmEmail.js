import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import {AuthContext} from '../contexts/AuthContext';

import {Picker} from '@react-native-community/picker';
import {BlurView} from '@react-native-community/blur';

import {normalize} from '../configs/responsive';

const colorWhiteCustom = 'rgba(255,255,255,0.7)';
const colorGreenCustom = '#18d08c';
const title = 'Update Account';
const message =
  'Can you update email and work type now?\nIf you would rather not be changed, please simply click Submit.';

const titleSubmitted = 'Thank you for joining Vetscope!';
const messageSubmitted =
  'Please check your email box for the confirmation email from Vetscope.\nYour registration will be completed after confirming your email address.';

const emailLabel = 'Email';
const workTypeLabel = 'Work type';
const workTypes = [
  {
    label: 'Veterinarian',
    value: 0,
  },
  {
    label: 'Vet technician',
    value: 1,
  },
  {
    label: 'Clinic manager',
    value: 2,
  },
  {
    label: 'Receptionist',
    value: 3,
  },
  {
    label: 'Veterinary student',
    value: 4,
  },
  {
    label: 'Other',
    value: 5,
  },
  {
    label: 'Guest',
    value: 6,
  },
];

const InputCustom = ({label, ...rest}) => {
  return (
    <View>
      <Text style={[styles.label, styles.textColor]}>{label}</Text>
      <TextInput {...rest} style={styles.input} />
    </View>
  );
};

const PickerWorkType = ({label, ...rest}) => {
  return (
    <View>
      <Text style={[styles.label, styles.textColor]}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker style={styles.picker} mode={"dropdown"} {...rest}>
          {workTypes.map((workType, index) => {
            return (
              <Picker.Item
                key={index}
                label={workType.label}
                value={workType.value}
                color={colorWhiteCustom}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

const SubmitButton = (props) => {
  return (
    <TouchableOpacity style={styles.submitButton} {...props}>
      <Text style={styles.submitText}>Submit</Text>
    </TouchableOpacity>
  );
};

const BlurBackground = () => {
  return (
    <BlurView
      style={styles.blurBackground}
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
  );
};

const ConfirmEmail = () => {
  const [email, setEmail] = useState('');
  const [workType, setWorkType] = useState(workTypes[0].value);
  const auth = useContext(AuthContext);

  const onChangeEmail = (e) => setEmail(e);

  const onSubmit = async () => {
    await auth.onConfirmEmail(email, workType);
  };

  return (
    <View style={styles.container}>
      <BlurBackground />
      <View style={styles.wrapper}>
        <Text style={[styles.title, styles.textColor]}>{title}</Text>
        <Text style={[styles.textColor, styles.message]}>{message}</Text>

        <InputCustom
          label={emailLabel}
          value={email}
          onChangeText={onChangeEmail}
        />
        <PickerWorkType
          label={workTypeLabel}
          selectedValue={workType}
          onValueChange={(value) => setWorkType(value)}
        />
        <SubmitButton onPress={onSubmit} />
      </View>
    </View>
  );
};

const CheckConfirm = () => {
  return (
    <View style={styles.container}>
      <BlurBackground />
      <View style={styles.wrapper}>
        <Text style={[styles.title, styles.textColor]}>{titleSubmitted}</Text>
        <Text style={[styles.textColor, styles.message, styles.center]}>
          {messageSubmitted}
        </Text>
      </View>
    </View>
  );
};

export default ConfirmEmail;
export {CheckConfirm};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99999,
    justifyContent: 'center',
  },
  textColor: {
    color: colorWhiteCustom,
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(20),
    letterSpacing: 1,
  },
  message: {
    letterSpacing: 0.8,
    fontSize: normalize(16),
    marginVertical: 16,
  },
  center: {
    textAlign: 'center',
  },
  label: {
    fontSize: normalize(14),
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  input: {
    alignSelf: 'stretch',
    borderWidth: 0.5,
    borderColor: colorWhiteCustom,
    borderRadius: 4,
    marginBottom: 16,
    color: colorWhiteCustom,
    fontSize: normalize(18),
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pickerWrapper: {
    borderWidth: 0.5,
    borderColor: colorWhiteCustom,
    borderRadius: 4,
  },
  picker: {
    color: colorWhiteCustom,
  },
  submitText: {
    color: colorGreenCustom,
    textAlign: 'center',
    fontSize: normalize(18),
  },
  submitButton: {
    width: normalize(200),
    borderColor: colorGreenCustom,
    borderWidth: 0.5,
    borderRadius: 4,
    paddingVertical: 16,
    alignSelf: 'center',
    marginTop: 36,
  },
  wrapper: {
    padding: 16,
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
