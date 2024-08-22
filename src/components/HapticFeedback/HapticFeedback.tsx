import React, {PropsWithChildren, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import diceOne from '../../assets/DiceImage/diceOne.png';
import diceTwo from '../../assets/DiceImage/diceTwo.png';
import diceThree from '../../assets/DiceImage/diceThree.png';
import diceFour from '../../assets/DiceImage/diceFour.png';
import diceFive from '../../assets/DiceImage/diceFive.png';
import diceSix from '../../assets/DiceImage/diceSix.png';

type DiceProps = PropsWithChildren<{
  imgUrl: ImageSourcePropType;
}>;

const ImageDice = ({imgUrl}: DiceProps): JSX.Element => {
  return <Image source={imgUrl} style={styles.imgStyle} />;
};

const HapticFeedback = () => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(diceOne);

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setDiceImage(diceOne);
        break;
      case 2:
        setDiceImage(diceTwo);
        break;
      case 3:
        setDiceImage(diceThree);
        break;
      case 4:
        setDiceImage(diceFour);
        break;
      case 5:
        setDiceImage(diceFive);
        break;
      case 6:
        setDiceImage(diceSix);
        break;
      default:
        setDiceImage(diceOne);
    }
    ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  return (
    <View style={styles.container}>
      <ImageDice imgUrl={diceImage} />
      <Pressable onPress={rollDiceOnTap} style={styles.btn}>
        <Text style={styles.btnText}>Roll the Dice</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  btn: {
    width: 200,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
});

export default HapticFeedback;
