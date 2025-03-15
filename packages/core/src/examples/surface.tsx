import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Surface from '@/components/Surface';
import Text from '@/components/Typography/Text'

const ELEVATION = [0, 1,2,3,4,5];

const SurfaceExample = () => (
  <View style={styles.container}>
    {
      Array.from({length:6}).map((_, i) => (
        <Surface style={styles.surface} elevation={(ELEVATION[i]) as any}>
           <Text>Surface</Text>
        </Surface>
      ))
    }
  </View>
);

export default SurfaceExample;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap'
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24
  },
});
