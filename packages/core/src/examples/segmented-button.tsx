import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SegmentedButtons from '@/components/SegmentedButtons/SegmentedButtons';

const SegmentedButtonExample = () => {
  const [value, setValue] = React.useState('');
  const [values, setValues] = React.useState(['']);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            icon:'walk',
            label: 'Walking',
          },
          {
            value: 'train',
            icon: 'train',
            label: 'Transit',
          },
          {
            value: 'drive',
            icon: 'car',
            label: 'Driving'
          },
        ]}
      />
      <SegmentedButtons
        multiSelect
        value={values}
        onValueChange={(v) => setValues(v)}
        buttons={[
          {
            value: 'walk',
            icon: values.includes('walk') ? 'check' : '',
            label: 'Walking',
          },
          {
            value: 'train',
            icon: values.includes('train') ? 'check' : '',
            label: 'Transit',
          },
          {
            value: 'drive',
            icon: values.includes('drive') ? 'check' : '',
            label: 'Driving'
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 16
  },
});

export default SegmentedButtonExample;
