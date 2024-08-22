import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(16, 'Password must not be more than 16 characters')
    .required('Password length is required'),
});

const PasswordGenerator = () => {
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isPasswordGenerated, setIsPasswordGenerated] =
    useState<boolean>(false);

  const generatePassword = (passwordLength: number) => {
    let generatedPassword = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbolsCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const numbersCharacters = '0123456789';
    let allCharacters = '';

    if (lowercase) {
      allCharacters += characters;
    }
    if (uppercase) {
      allCharacters += uppercaseCharacters;
    }
    if (numbers) {
      allCharacters += numbersCharacters;
    }
    if (symbols) {
      allCharacters += symbolsCharacters;
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomPassword = Math.floor(Math.random() * allCharacters.length);
      generatedPassword += allCharacters[randomPassword];
    }
    setPassword(generatedPassword);
    setIsPasswordGenerated(true);
  };

  const resetState = () => {
    setIsPasswordGenerated(false);
    setPassword('');
    setLowercase(false);
    setUppercase(false);
    setSymbols(false);
    setNumbers(false);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.mainContiner}>
        <Text style={styles.title}>Password Generater</Text>
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePassword(+values.passwordLength);
            }}>
            {({
              values,
              isValid,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.form}>
                  <View style={styles.formGroup}>
                    <View style={styles.passwordLengthContainer}>
                      <Text style={styles.heading1}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      style={styles.input}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.heading2}> Lowercase: </Text>
                    <BouncyCheckbox
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor="#d1025c"
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.heading2}> Uppercase: </Text>
                    <BouncyCheckbox
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="#d15802"
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.heading2}> Number: </Text>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#0277d1"
                      style={styles.checkbox}
                    />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.heading2}> Symbols: </Text>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="green"
                      style={styles.checkbox}
                    />
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.button}
                      onPress={e => handleSubmit()}>
                      <Text style={styles.buttonText}>Generate Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={() => {
                        handleReset();
                        resetState();
                      }}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {isPasswordGenerated && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Result Password:</Text>
                    <Text style={styles.copyText}>
                      Long press to Copy Password
                    </Text>
                    <Text style={styles.resultPassword} selectable={true}>
                      {password}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainContiner: {
    // padding: 10,
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    gap: 40,
  },
  form: {
    flex: 1,
    gap: 14,
    width: '80%',
  },
  formGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  passwordLengthContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
  },
  heading1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '30%',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#504ec3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#504ec3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultPassword: {
    fontSize: 16,
    backgroundColor: '#e9e8e8',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
    color: '#000',
    fontWeight: '400',
  },
  copyText: {
    fontSize: 16,
  },
});

export default PasswordGenerator;
