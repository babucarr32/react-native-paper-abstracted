import * as React from 'react';
import ProgressBar from '@/components/ProgressBar';
import Text from '@/components/Typography/Text'

const ProgressExample = () => (
  <>
    <Text style={{marginBottom: 8}}>Progress: 50%</Text>
    <ProgressBar progress={0.5}  />
  </>
);

export default ProgressExample;
