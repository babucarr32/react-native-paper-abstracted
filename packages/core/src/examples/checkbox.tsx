import * as React from 'react';
import Text from '@/components/Typography/Text'
import Checkbox from '@/components/Checkbox';
import { View } from 'react-native';

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={{gap: 16}}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text>Helix</Text>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color='brown'
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text>Vim</Text>
        <Checkbox status={'unchecked'} />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text>kakoune</Text>
        <Checkbox status={'checked'}  />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text>VS Code</Text>
        <Checkbox status={'unchecked'} uncheckedColor='red' />
      </View>
    </View>
  );
};

export default CheckboxExample;
