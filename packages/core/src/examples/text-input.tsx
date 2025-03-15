import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Text from '@/components/Typography/Text'
import TextInput from '@/components/TextInput/TextInput';

const TextInputExample = () => {
  const [text, setText] = React.useState("");
  const [secureText, setSecureText] = React.useState("");
  const [multilineText, setMultilineText] = React.useState("");
  const [outlinedText, setOutlinedText] = React.useState("");
  const [flatText, setFlatText] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <ScrollView style={styles.container}>     
      <TextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
        style={styles.input}
      />
      
      <Text style={styles.label}>Outlined</Text>
      <TextInput
        label="Username"
        value={outlinedText}
        onChangeText={text => setOutlinedText(text)}
        mode="outlined"
        style={styles.input}
      />
      
      <Text style={styles.label}>Flat</Text>
      <TextInput
        label="Name"
        value={flatText}
        onChangeText={text => setFlatText(text)}
        mode="flat"
        style={styles.input}
      />
      
      <Text style={styles.label}>With Icon</Text>
      <TextInput
        label="Search"
        value={text}
        onChangeText={text => setText(text)}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.input}
      />
      
      <Text style={styles.label}>Password with Toggle</Text>
      <TextInput
        label="Password"
        value={secureText}
        onChangeText={text => setSecureText(text)}
        secureTextEntry={!passwordVisible}
        right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
        style={styles.input}
      />
      
      <Text style={styles.label}>Multiline</Text>
      <TextInput
        label="Description"
        value={multilineText}
        onChangeText={text => setMultilineText(text)}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
            
      <Text style={styles.label}>With Error</Text>
      <TextInput
        label="Error Example"
        value={text}
        onChangeText={text => setText(text)}
        error
        style={styles.input}
      />
      
      <Text style={styles.label}>With Helper Text</Text>
      <TextInput
        label="Password"
        value={secureText}
        onChangeText={text => setSecureText(text)}
        secureTextEntry
        style={styles.input}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    marginBottom: 8,
  },
});

export default TextInputExample;
