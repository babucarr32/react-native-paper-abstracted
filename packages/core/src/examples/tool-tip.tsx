import * as React from 'react';
import Tooltip from '@/components/Tooltip/Tooltip';
import IconButton from '@/components/IconButton/IconButton';

const ToolTipExample = () => (
  <Tooltip title="Selected Camera">
    <IconButton icon="camera" selected size={24} onPress={() => {}} />
  </Tooltip>
);

export default ToolTipExample;
