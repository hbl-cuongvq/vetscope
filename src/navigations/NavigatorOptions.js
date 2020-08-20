import {CardStyleInterpolators} from '@react-navigation/stack';

const StackOptions = ({route}) => ({
  headerShown: route.name !== 'Home' ? true : false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: {
    backgroundColor: '#011A27',
  },
  headerTintColor: 'white',
});

export {StackOptions};
