import * as React from 'react';
import Text from '@/components/Typography/Text'
import TouchableRipple from '@/components/TouchableRipple/TouchableRipple'
import { View } from 'react-native';

const TouchableRippleExample = () => (
  <View style={{flex: 1}}>
    <TouchableRipple
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => console.log('Pressed')}
      rippleColor="rgba(0, 0, 0, .32)"
    >
      <Text>Press anywhere</Text>
    </TouchableRipple>
  </View>
);

export default TouchableRippleExample;
