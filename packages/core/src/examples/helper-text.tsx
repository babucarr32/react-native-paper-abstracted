import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/components/Typography/Text'
import TextInput from '@/components/TextInput/TextInput';
import HelperText from '@/components/HelperText/HelperText';

const HelperTextExample = () => {
  // Email validation
  const [email, setEmail] = React.useState('');
  const hasEmailErrors = () => {
    return email.length > 0 && !email.includes('@');
  };
  
  // Password validation
  const [password, setPassword] = React.useState('');
  const hasPasswordErrors = () => {
    return password.length > 0 && password.length < 8;
  };
  
  // Form with multiple validations
  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');
  
  // Info helper text state
  const [showInfo, setShowInfo] = React.useState(true);
  
  // Password visibility toggle
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  
  return (
    <View>     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Error Validation</Text>
        <TextInput
          label="Email" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <HelperText type="error" visible={hasEmailErrors()}>
          Email address is invalid!
        </HelperText>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info Helper</Text>
        <TextInput 
          label="Username" 
          value={username} 
          onChangeText={setUsername}
        />
        <HelperText type="info" visible={showInfo}>
          Username must be unique and cannot be changed later.
        </HelperText>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toggleable Helper</Text>
        <TextInput 
          label="Bio" 
          value={bio} 
          onChangeText={setBio}
          multiline
          numberOfLines={2}
        />
        <HelperText 
          type="info" 
          visible={bio.length > 0} 
          onPress={() => setShowInfo(!showInfo)}
        >
          {bio.length}/100 characters
        </HelperText>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Password Validation</Text>
        <TextInput 
          label="Password" 
          value={password} 
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon 
              icon={secureTextEntry ? "eye" : "eye-off"} 
              onPress={() => setSecureTextEntry(!secureTextEntry)} 
            />
          }
        />
        <HelperText type="error" visible={hasPasswordErrors()}>
          Password must be at least 8 characters
        </HelperText>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Validations</Text>
        <TextInput 
          label="Email" 
          value={email} 
          onChangeText={setEmail}
        />
        <HelperText type="error" visible={email.length > 0 && !email.includes('@')}>
          Must include @ symbol
        </HelperText>
        <HelperText type="error" visible={email.length > 0 && !email.includes('.')}>
          Must include a domain (.com, .org, etc.)
        </HelperText>
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
    marginTop: 8,
    marginBottom: 8,
  },
});

export default HelperTextExample;
