

```markdown
# React Native ChatGPT Streaming Markdown 🚀

A high-performance proof-of-concept for streaming Markdown text in React Native (similar to OpenAI's ChatGPT mobile app). 

### 🛑 The Problem
Rendering Markdown character-by-character causes massive performance issues and UI flickering because the Markdown parser attempts to re-render the entire tree on every keystroke.

### ✅ The Solution
This project implements a **Chunking Strategy**:
1.  **Decoupled State:** Separates the data stream from the render cycle.
2.  **Optimized Batching:** Updates text in small chunks (3-4 chars) rather than 1-by-1 to maintain 60 FPS.
3.  **Visual Polish:** Includes a custom blinking cursor and auto-scrolling logic.

---

## ⚡ Features
- **Zero Flickering:** Smooth Markdown rendering even with complex blocks (Code, Tables, Lists).
- **Typing Effect:** Natural "AI-style" text generation speed.
- **Blinking Cursor:** Animated cursor that follows the stream.
- **Auto-Scroll:** UI stays pinned to the bottom of the chat.

## 🛠 Tech Stack
- **Framework:** React Native (Expo)
- **Markdown:** `react-native-markdown-display`
- **Animation:** `Animated` API (Native Driver)

## 🚀 How to Run

1. **Clone the repo**
   ```bash
   git clone [https://github.com/yourusername/streaming-markdown-demo.git](https://github.com/yourusername/streaming-markdown-demo.git)
   cd streaming-markdown-demo

```

2. **Install Dependencies**
```bash
yarn install

```


3. **Run the App**
```bash
yarn start

```



## 💡 Code Highlight (The Fix)

Instead of a raw stream, we use a `setInterval` loop to batch updates, preventing the Markdown parser from blocking the JS thread.

```javascript
// Logic snippet
useEffect(() => {
  const interval = setInterval(() => {
    if (currentIndex < content.length) {
      // Add 4 characters at a time for performance + smoothness
      setDisplayedContent(prev => prev + content.slice(currentIndex, currentIndex + 4));
      currentIndex += 4;
    }
  }, 20);
}, []);

```
