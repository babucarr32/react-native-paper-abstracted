import * as React from 'react';
import Badge from '@/components/Badge';
import { View } from 'react-native';
import Icon from '@/components/Icon';

const BadgeExample = () => (
  <View style={{gap:24}}>
    <View style={{position: 'relative', width: 24, height: 24}}>
      <Icon source={'bell-outline'} size={24} />
      <Badge style={{position: 'absolute',top:-1}} size={6}></Badge>
    </View>
    <View style={{position: 'relative', width: 24, height: 24}}>
      <Icon source={'bell-outline'} size={24} />
      <Badge style={{position: 'absolute',top:-1}} size={14}>3</Badge>
    </View>
    <View style={{position: 'relative', width: 24, height: 24}}>
      <Icon source={'bell-outline'} size={24} />
      <Badge style={{position: 'absolute',top:-1, left: 12}} size={14}>999+</Badge>
    </View>
  </View>
);

export default BadgeExample;
