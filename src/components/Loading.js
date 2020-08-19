import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Loading = () => {
  let insets = useSafeAreaInsets();

  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size="large" color="white" style={styles.loading(insets)} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loading: (insets) => ({
    alignSelf: 'center',
    transform: [{translateY: -insets.top}]
  }),
});
