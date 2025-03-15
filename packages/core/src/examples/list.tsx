import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as List from '@/components/List/List'
import Divider from '@/components/Divider';
import { MD3Colors } from '@/components/styles/themes/v3/tokens';

const ListExamples = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView style={styles.container}>
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => console.log('Pressed')}
      />
      <Divider />

      <List.Item
        title="Second Item"
        description="With custom icon color"
        left={props => <List.Icon {...props} icon="star" color={MD3Colors.primary70} />}
        onPress={() => console.log('Pressed')}
      />
      <Divider />

      <List.Section>
        <List.Subheader>Some title</List.Subheader>
        <List.Item title="First item" left={props => <List.Icon {...props} icon="calendar" />} />
        <List.Item title="Second item" left={props => <List.Icon {...props} icon="folder" />} />
      </List.Section>
      <Divider />

      <List.Accordion
        title="Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <Divider />

      <List.Item
        title="Three line item"
        description="This item has a very long description that will be truncated after the third line of text."
        descriptionNumberOfLines={3}
        left={props => <List.Icon {...props} icon="text" />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ListExamples;
