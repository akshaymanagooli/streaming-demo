import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StreamingMarkdown from './components/StreamingMarkdown';

// A fake "Long" AI response with Markdown features
const AI_RESPONSE = `
# Hello! 👋

I am a **streaming** AI assistant. I can write code, lists, and more.

Here is a list of my features:
1. Fast typing speed ⚡
2. Markdown support 📝
3. No flickering! 🚫

### Code Example:
\`\`\`javascript
const sayHello = () => {
  console.log("Hello World!");
};
\`\`\`

I hope this helps you win the job! 🚀
`;

export default function App() {
  const [streamData, setStreamData] = useState(null);
  const scrollViewRef = useRef();

  const startDemo = () => {
    // Reset to null first to restart animation
    setStreamData(null);
    setTimeout(() => {
      setStreamData(AI_RESPONSE);
    }, 100);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ChatGPT Stream Demo</Text>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 50 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {streamData ? (
            <View style={styles.bubble}>
               <StreamingMarkdown content={streamData} />
            </View>
          ) : (
            <Text style={styles.placeholder}>Press "Start Demo" to simulate AI...</Text>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={startDemo}>
          <Text style={styles.buttonText}>▶️ Start Streaming</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  bubble: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  placeholder: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});