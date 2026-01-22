import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import Markdown from 'react-native-markdown-display';

const StreamingMarkdown = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // Animation for the blinking cursor
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  // Blinking cursor animation loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(cursorOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const chunkSize = 4; // Add 4 characters at a time (Optimization)
    const speed = 20;    // 20ms delay between chunks

    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        // Slice the next chunk
        const nextChunk = content.slice(0, currentIndex + chunkSize);
        setDisplayedContent(nextChunk);
        currentIndex += chunkSize;
      } else {
        // Ensure the full text is shown at the end
        setDisplayedContent(content);
        setIsTyping(false);
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <View style={styles.container}>
      {/* The Markdown Content */}
      <Markdown style={markdownStyles}>
        {displayedContent}
      </Markdown>

      {/* The Blinking Cursor (Only show while typing) */}
      {isTyping && (
        <Animated.View style={[styles.cursor, { opacity: cursorOpacity }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cursor: {
    width: 10,
    height: 20,
    backgroundColor: '#007AFF', // ChatGPT Blue
    marginTop: 5,
    marginLeft: 2,
  },
});

// Custom Markdown Styles (Optional: Make it look nice)
const markdownStyles = {
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  code_inline: {
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderRadius: 4,
    fontFamily: 'Courier',
  },
  fence: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
};

export default StreamingMarkdown;