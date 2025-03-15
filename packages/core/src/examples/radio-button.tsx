import * as React from 'react';
import { View } from 'react-native';
import RadioButton from '@/components/RadioButton'
import Text from '@/components/Typography/Text'

const RadioButtonExample = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <RadioButton
          value="first"
          status={ checked === 'first' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('first')}
        />
        <Text>First</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <RadioButton
          value="second"
          status={ checked === 'second' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('second')}
        />
        <Text>Second</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <RadioButton
          value="third"
          status={ checked === 'third' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('third')}
        />
        <Text>Third</Text>
      </View>
    </View>
  );
};

export default RadioButtonExample;
