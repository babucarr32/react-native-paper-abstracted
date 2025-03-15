import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/Typography/Text'
import { MD3Colors } from '@/components/styles/themes/v3/tokens';
import Icon from '@/components/Icon'; 

const IconExample = () => {
  return (
    <View>     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Icon</Text>
        <Icon
          source="camera"
          color={MD3Colors.error50}
          size={20}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Sizes</Text>
        <View style={styles.row}>
          <Icon source="heart" size={16} />
          <Icon source="heart" size={24} />
          <Icon source="heart" size={36} />
          <Icon source="heart" size={48} />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Colors</Text>
        <View style={styles.row}>
          <Icon source="star" color={MD3Colors.primary50} size={24} />
          <Icon source="star" color={MD3Colors.secondary50} size={24} />
          <Icon source="star" color={MD3Colors.tertiary50} size={24} />
          <Icon source="star" color={MD3Colors.error50} size={24} />
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default IconExample;
