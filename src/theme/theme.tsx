import {useColorScheme} from 'react-native';

const light = {
  colors: {
    primary: '#000',
    secondary: '#fff',
    background: '#f4f4f4',
    text: '#000',
    border: '#000',
    button: '#000',
    buttonText: '#fff',
    buttonBorder: '#000',
    buttonTextBorder: '#000',
    buttonTextBorderHover: '#000',
    buttonTextBorderActive: '#000',
    buttonTextBorderFocus: '#000',
    inputBorder: '#ccc',
  },
};

const dark = {
  colors: {
    primary: '#fff',
    secondary: '#000',
    background: '#000',
    text: '#fff',
    border: '#fff',
    button: '#fff',
    buttonText: '#000',
    buttonBorder: '#fff',
    buttonTextBorder: '#fff',
    buttonTextBorderHover: '#fff',
    buttonTextBorderActive: '#fff',
    buttonTextBorderFocus: '#fff',
    inputBorder: '#ccc',
  },
};

let theme = 'light';
function useColorTheme() {
  if (theme == 'dark') {
    return dark.colors;
  } else {
    return light.colors;
  }
}

const Color = useColorTheme();

export {Color, theme};
