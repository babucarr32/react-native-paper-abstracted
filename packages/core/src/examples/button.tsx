import * as React from 'react';
import Button from '@/components/Button/Button';
import { View } from 'react-native';

const ButtonExample = () => (
  <View style={{flexDirection: 'row', gap: 16, flexWrap: 'wrap'}}>
    <Button style={{width: 'auto'}} mode="contained" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" loading mode="contained">
      Loading
    </Button>

    <Button style={{width: 'auto'}} mode="outlined" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" mode="outlined" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" loading mode="outlined">
      Loading
    </Button>

    <Button style={{width: 'auto'}} mode="text" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" mode="text" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" loading mode="text">
      Loading
    </Button>

    <Button style={{width: 'auto'}} mode="elevated" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" mode="elevated" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" loading mode="elevated">
      Loading
    </Button>

    <Button style={{width: 'auto'}} mode="contained-tonal" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" mode="contained-tonal" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    <Button style={{width: 'auto'}} icon="camera" loading mode="contained-tonal">
      Loading
    </Button>
  
  </View>
);

export default ButtonExample;
