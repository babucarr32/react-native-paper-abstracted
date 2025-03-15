import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '@/components/IconButton/IconButton';
import { MD3Colors } from '@/components/styles/themes/v3/tokens';

const IconButtonExample = () => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="camera"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log('Pressed')}
      />

      <IconButton
        icon="heart"
        size={36}
        onPress={() => console.log('Pressed')}
      />

      <IconButton
        icon="plus"
        mode="contained"
        onPress={() => console.log('Pressed')}
      />

      <IconButton
        icon="delete"
        disabled
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default IconButtonExample;
