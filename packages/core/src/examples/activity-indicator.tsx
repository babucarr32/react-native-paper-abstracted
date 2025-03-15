import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/Typography/Text'
import ActivityIndicator from '@/components/ActivityIndicator';
import * as MD2Colors from '@/components/styles/themes/v2/colors'
import { MD3Colors } from '@/components/styles/themes/v3/tokens';

const ActivityIndicatorExample = () => {
  return (
    <View >      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default</Text>
        <ActivityIndicator animating={true} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Color (MD2)</Text>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MD3 Color</Text>
        <ActivityIndicator animating={true} color={MD3Colors.primary90} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Sizes</Text>
        <View style={styles.row}>
          <ActivityIndicator animating={true} size="small" style={styles.marginRight} />
          <ActivityIndicator animating={true} size="large" />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Not Animating</Text>
        <ActivityIndicator animating={false} hidesWhenStopped={false} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hidden When Stopped</Text>
        <ActivityIndicator animating={false} hidesWhenStopped={true} />
        <Text style={styles.caption}>This indicator is hidden (hidesWhenStopped=true)</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Background</Text>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator animating={true} color={MD2Colors.white} />
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
  },
  marginRight: {
    marginRight: 16,
  },
  caption: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  indicatorContainer: {
    backgroundColor: MD2Colors.purple500,
    borderRadius: 8,
    padding: 16,
    width: 80,
    alignItems: 'center',
  },
});

export default ActivityIndicatorExample;
