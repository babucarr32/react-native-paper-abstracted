import * as React from 'react';
import { Image } from 'react-native';
import Banner from '@/components/Banner';
import { useTheme } from '@/components/core/theming';

import Appbar from '@/components/Appbar';

const TopAppBar = () => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Banner" />
  </Appbar.Header>
);

const BannerExample = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(true);

  return (
    <>
    <TopAppBar />
     <Banner
       style={{backgroundColor: colors.surface}}
        visible={visible}
        actions={[
          {
            label: 'Fix it',
            onPress: () => setVisible(false),
          },
          {
            label: 'Learn more',
            onPress: () => setVisible(false),
          },
        ]}
        icon={({size}) => (
          <Image
            source={{
              uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
            }}
            style={{
              width: size,
              height: size,
              borderRadius: 100
            }}
          />
        )}>
        There was a problem processing a transaction on your credit card.
      </Banner>
    </>
  );
};

export default BannerExample;
