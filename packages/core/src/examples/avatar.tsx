import * as React from 'react';
import Avatar from '@/components/Avatar/AvatarIcon';
import { View } from 'react-native';
import AvatarImage from '@/components/Avatar/AvatarImage';
import AvatarText from '@/components/Avatar/AvatarText';

const AvatarExample = () => (
  <View style={{gap: 16}}>
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
      <Avatar size={24} icon="emoticon" style={{backgroundColor: 'yellow'}} />
      <Avatar size={40} icon="emoticon-cool" style={{backgroundColor: 'cyan'}} />
      <Avatar size={56} icon="emoticon-poop" style={{backgroundColor: 'brown'}} />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
      <AvatarImage size={24} source={require('../../assets/images/avatar.png')} />
      <AvatarImage size={40} source={require('../../assets/images/avatar.png')} />
      <AvatarImage size={56} source={require('../../assets/images/avatar.png')} />
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
      <AvatarText size={24} label="AB" style={{backgroundColor: 'orange'}} />
      <AvatarText size={40} label="XO" style={{backgroundColor: 'green'}} />
      <AvatarText size={56} label="IV" style={{backgroundColor: 'red'}} />
    </View>
  </View>
);

export default AvatarExample;
