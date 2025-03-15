import Text from '@/components/Typography/Text'
import { useTheme } from "@/components/core/theming"
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import Icon from '@/components/Icon';

const MusicRoute = () => {
  const {colors} = useTheme();

  return (
    <ScrollView style={{padding: 16}}>
      {
        Array.from({length:4}).map((_,i) => (
          <View
            key={i}
            style={{
              height: 300,
              width: '100%',
              marginTop: 16,
              borderRadius: 24,
              backgroundColor: colors.primaryContainer,
            }}
          />
        ))
      }
    </ScrollView>
  )
};

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNavigationExample = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      
    />
  );
};

export default BottomNavigationExample;
