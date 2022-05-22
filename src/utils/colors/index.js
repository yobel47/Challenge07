const mainColors = {
  black1: '#112340',
  black2: 'rgba(0, 0, 0, 0.5)',
  grey1: '#7D8797',
  grey2: '#B1B7C2',
  grey3: '#E9E9E9',
  grey4: '#EDEEF0',
  grey5: '#B1B7C2',
  dark1: '#112340',
  dark2: '#495A75',
  red1: '#E06379',
  blue1: '#2F80ED',
  blue2: '#0066CB',
  green1: '#0BCAD4',
  green2: '#EDFCFD',

};

export const colors = {
  warning: mainColors.red1,
  primary: mainColors.blue1,
  secondary: mainColors.dark1,
  background: {
    primary: 'white',
    secondary: mainColors.blue1,
    bottomNavigation: mainColors.dark1,
  },
  button: {
    primary: {
      background: mainColors.blue1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.dark1,
    },
  },

  text: {
    primary: 'white',
    secondary: mainColors.blue1,
    black: mainColors.black1,
    subtitle: mainColors.grey1,
  },
  disable: {
    background: mainColors.grey4,
    text: mainColors.grey5,
  },
  lineTextInput: mainColors.blue1,
  loadingBackground: mainColors.black2,
  menuInactive: mainColors.dark2,
  menuActive: mainColors.blue1,
  outlineInput: mainColors.grey2,
  border: mainColors.grey3,
  tertiary: mainColors.blue1,
  cardLight: mainColors.green2,

};
