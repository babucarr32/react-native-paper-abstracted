import * as React from 'react';
import Chip from '@/components/Chip/Chip';
import { View } from 'react-native';

const ChipExample = () => {
  return (
    <View style={{flexDirection: 'row', gap: 8, flexWrap: 'wrap'}}>
      <Chip
        closeIcon='close'
        icon="information"
        onClose={() => {}}
        onPress={() => console.log('Pressed')}
      >
        Information
      </Chip>
      <Chip
        disabled
        icon="information"
        onPress={() => console.log('Pressed')}
      >
        Information
      </Chip>
      <Chip>
        Filter
      </Chip>
      <Chip
        icon="heart"
        onPress={() => console.log('Pressed')}
      >
        Favorite
      </Chip>
    </View>
  )
};

export default ChipExample;
