# Conversation Visualization Tool

This is an interactive visualization tool for analyzing productive conversations, developed to explore conversation dynamics and participant interactions.

## 📁 Key Files

- **`conversation_visualizer_enhanced.html`**: Main visualization application
- **`collaboration_conversations/productive_conversation_analysis.json`**: Academic collaboration conversation (2 speakers)
- **`dialogue_conversations/productive_dialogue_analysis.json`**: Multi-participant dialogue conversation (6 speakers, 272 turns)

## 🚀 Getting Started

1. **Start a local server** (required due to CORS restrictions):
   ```bash
   python3 -m http.server 8000
   ```

2. **Open the visualization**: Navigate to `http://localhost:8000/conversation_visualizer_enhanced.html`

## 🎯 Features

### 📊 **Network Views**
- **People Network**: Shows interactions between conversation participants
- **Category Network**: Displays conceptual relationships (agreement, disagreement, new ideas, etc.)
- **Temporal Flow**: Individual turn-to-turn interactions with temporal progression

### 📈 **Timeline View**
- Conversation flow over time with feature-based coloring
- Interactive tooltips showing conversation text and features
- Curved connections between speakers

### 📝 **Interactive Transcript**
- Scrollable conversation transcript
- Hover highlighting: transcript ↔ network synchronization
- Real-time visual feedback

## 🎨 **Visual Design**

### **Node Colors**
- **People**: Simplified grey palette for professional appearance
- **Categories**: Color-coded by conversation feature type

### **Edge Gradients**
- **Directional flow**: Dark grey (source) → Light grey (target)
- **Clear directionality**: Visual encoding of conversation flow

### **Feature Categories**
- 🟢 **Agreement**: Collaborative consensus
- 🔴 **Disagreement**: Constructive conflict
- 🔵 **New Ideas**: Innovation and creativity
- 🟣 **Collaborative Building**: Joint development
- 🟠 **Curiosity**: Questions and exploration
- ⚫ **Uncertainty**: Hedging and exploration

## 📊 **Data Structure**

The visualization expects JSON data with:
- **People**: Participant information
- **Turns**: Individual conversation contributions with features
- **Links**: Response relationships with strength ratings
- **Features**: Quantified conversation qualities (curiosity, agreement, etc.)

## 🛠 **Technical Notes**

- **Framework**: D3.js for interactive visualizations
- **Compatibility**: Modern browsers with ES6 support
- **Performance**: Optimized for conversations up to 50 turns
- **Responsive**: Adapts to different screen sizes

## 📄 **Sample Data**

The included `collaboration_conversations/productive_conversation_analysis.json` contains a real academic conversation about network optimization, annotated with:
- Conversation features (curiosity, uncertainty, agreement, etc.)
- Response relationships and strengths
- Temporal information and turn boundaries
