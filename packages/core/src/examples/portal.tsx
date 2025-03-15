import * as React from 'react';
import Text from '@/components/Typography/Text'
import Portal from '@/components/Portal/Portal';

const PortalExample = () => (
  <Portal>
    <Text>This is rendered at a different place</Text>
  </Portal>
);

export default PortalExample;
