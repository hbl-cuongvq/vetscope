import React, {useContext, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {normalize} from '../configs/responsive';
import {AuthContext} from '../contexts/AuthContext';

const FacebookButton = ({insets}) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    setIsLoading(true);
    await auth.onLoginWithFacebook();
    setIsLoading(false);
  };

  return (
    <TouchableOpacity style={styles.container(insets)} onPress={onPress}>
      <FontAwesome
        name="facebook"
        size={24}
        color="rgba(255,255,255,0.9)"
        style={styles.iconFacebook}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.txt}>Login with Facebook</Text>
      )}
    </TouchableOpacity>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  container: (insets) => ({
    backgroundColor: 'rgba(57, 112, 225, .3)',
    flexDirection: 'row',
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 24,
    marginBottom: insets.bottom,
    borderColor: 'rgba(255,255,255,0.4)',
  }),
  iconFacebook: {
    position: 'absolute',
    left: 8,
  },
  txt: {
    color: 'rgba(255,255,255,0.9)',
  },
});
