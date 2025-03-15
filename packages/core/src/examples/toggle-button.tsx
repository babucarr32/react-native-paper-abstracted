import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/Typography/Text'
import ToggleButton from '@/components/ToggleButton';

const ToggleButtonExample = () => {
  const [status, setStatus] = React.useState<'checked' | 'unchecked'>('checked');
  const onButtonToggle = () => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };

  const [value, setValue] = React.useState('left');

  const [firstButton, setFirstButton] = React.useState(false);
  const [secondButton, setSecondButton] = React.useState(false);
  const [thirdButton, setThirdButton] = React.useState(false);

  const [colorToggle, setColorToggle] = React.useState<'checked' | 'unchecked'>('unchecked');

  return (
    <View>    
      <Text style={styles.sectionTitle}>Single Toggle</Text>
      <ToggleButton
        icon="bluetooth"
        value="bluetooth"
        status={status}
        onPress={onButtonToggle}
        style={styles.button}
      />
      
      <Text style={styles.sectionTitle}>Custom Icon and Disabled State</Text>
      <View style={styles.row}>
        <ToggleButton
          icon="heart"
          value="heart"
          status={status}
          onPress={onButtonToggle}
          style={styles.button}
        />
        <ToggleButton
          icon="wifi"
          value="wifi"
          disabled
          style={styles.button}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Toggle Button Group (Radio)</Text>
      <ToggleButton.Group
        onValueChange={value => setValue(value)}
        value={value}
      >
        <View style={styles.row}>
          <ToggleButton icon="format-align-left" value="left" style={styles.groupButton} />
          <ToggleButton icon="format-align-center" value="center" style={styles.groupButton} />
          <ToggleButton icon="format-align-right" value="right" style={styles.groupButton} />
        </View>
      </ToggleButton.Group>
      
      <Text style={styles.sectionTitle}>Multiple Selection</Text>
      <View style={styles.row}>
        <ToggleButton
          icon="format-bold"
          value="bold"
          status={firstButton ? 'checked' : 'unchecked'}
          onPress={() => setFirstButton(!firstButton)}
          style={styles.groupButton}
        />
        <ToggleButton
          icon="format-italic"
          value="italic"
          status={secondButton ? 'checked' : 'unchecked'}
          onPress={() => setSecondButton(!secondButton)}
          style={styles.groupButton}
        />
        <ToggleButton
          icon="format-underline"
          value="underline"
          status={thirdButton ? 'checked' : 'unchecked'}
          onPress={() => setThirdButton(!thirdButton)}
          style={styles.groupButton}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Custom Colors</Text>
      <ToggleButton
        icon="star"
        value="star"
        status={colorToggle}
        onPress={() => setColorToggle(colorToggle === 'checked' ? 'unchecked' : 'checked')}
        iconColor={colorToggle === 'checked' ? '#FFD700' : undefined}
        style={styles.button}
      />
      
      <Text style={styles.sectionTitle}>Text Labels</Text>
      <View style={styles.row}>
        <ToggleButton.Group
          onValueChange={value => setValue(value)}
          value={value}
        >
          <View style={styles.row}>
            <ToggleButton 
              icon="text-to-speech" 
              value="audio" 
              style={styles.groupButton} 
              accessibilityLabel="Audio mode"
            />
            <ToggleButton 
              icon="video" 
              value="video" 
              style={styles.groupButton} 
              accessibilityLabel="Video mode"
            />
            <ToggleButton 
              icon="image" 
              value="image" 
              style={styles.groupButton} 
              accessibilityLabel="Image mode"
            />
          </View>
        </ToggleButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 4,
  },
  groupButton: {
    margin: 4,
  },
});

export default ToggleButtonExample;
