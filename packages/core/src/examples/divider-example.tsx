import * as React from 'react';
import { View } from 'react-native';
import Divider from '@/components/Divider';
import Text from '@/components/Typography/Text'

const DividerExample = () => (
  <View>
    <Text style={{marginVertical: 16}}>Helix</Text>
    <Divider />
    <Text style={{marginVertical: 16}}>Neovim</Text>
    <Divider />
    <Text style={{marginVertical: 16}}>Kakoune</Text>
    <Divider />
    <Text style={{marginVertical: 16}}>VS Code</Text>
    <Divider />
  </View>
);

export default DividerExample;
