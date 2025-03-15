import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import FAB from '@/components/FAB';
import Portal from '@/components/Portal/Portal';

const FABGroupExample = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        backdropColor='transparent'
        icon={open ? 'calendar-today' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

const FABExample = () => (
  <>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
      // position: 'relative',
    }}>
      <FAB
        icon="plus"
        size='small'
        variant='primary'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="plus"
        size='medium'
        variant='surface'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        size='large'
        icon="plus"
        variant='tertiary'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="plus"
        mode='flat'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="plus"
        label='Add more'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />

    </View>
    <FABGroupExample />
  </>
);

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    width: 'auto',
  },
})

export default FABExample;
