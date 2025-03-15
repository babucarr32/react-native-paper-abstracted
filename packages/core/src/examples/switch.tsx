import * as React from 'react';
import Switch from '@/components/Switch/Switch';
import Text from '@/components/Typography/Text'
import { View } from 'react-native';

const SwitchExample = () => {
  // Using a single state array for all switches
  const [switchStates, setSwitchStates] = React.useState([
    { id: 1, label: 'Item one', isOn: false, disabled: false },
    { id: 2, label: 'Item two', isOn: false, color: 'cyan', disabled: false },
    { id: 3, label: 'Item three', isOn: false, disabled: true },
  ]);

  const toggleSwitch = (id: number) => {
    setSwitchStates(switchStates.map(item => 
      item.id === id ? { ...item, isOn: !item.isOn } : item
    ));
  };

  return (
    <>
      {switchStates.map((item) => (
        <View 
          key={item.id}
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginVertical: 8 
          }}
        >
          <Text>{item.label}</Text>
          <Switch 
            value={item.isOn} 
            color={item.color || ''}
            disabled={item.disabled}
            onValueChange={() => toggleSwitch(item.id)} 
          />
        </View>
      ))}
    </>
  );
};

export default SwitchExample;
